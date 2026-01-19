import os
import fitz  # PyMuPDF
import json
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from dotenv import load_dotenv
from groq import Groq
from supabase import create_client, Client

load_dotenv()

app = FastAPI()

# Clients
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))
# Groq Client Initialization
groq_client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def extract_text_from_pdf(file_bytes):
    try:
        doc = fitz.open(stream=file_bytes, filetype="pdf")
        text = "".join([page.get_text() for page in doc])
        return text
    except Exception as e:
        print(f"PDF Error: {e}")
        return ""

@app.post("/optimize")
async def optimize_resume(file: UploadFile = File(...), job_description: str = Form(...)):
    try:
        # 1. Read PDF
        pdf_content = await file.read()
        resume_text = extract_text_from_pdf(pdf_content)
        
        if not resume_text:
            raise HTTPException(status_code=400, detail="Could not read PDF text")

        # 2. Ask Groq (Using Llama 3.3 70B for high-quality logic)
        prompt = f"""
        Compare this Resume to this Job Description.
        Resume: {resume_text}
        Job Description: {job_description}
        
        You must return ONLY a JSON object with this exact structure:
        {{
            "score": number,
            "missing_keywords": ["keyword1", "keyword2"],
            "advice": ["tip 1", "tip 2", "tip 3"]
        }}
        """

        chat_completion = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system",
                    "content": "You are a professional HR recruiter assistant. You only output valid JSON."
                },
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
            model="llama-3.3-70b-versatile",
            # This ensures Groq forces the output into a JSON format
            response_format={"type": "json_object"} 
        )

        # 3. Parse Response
        raw_response = chat_completion.choices[0].message.content
        analysis_data = json.loads(raw_response)

        # 4. Normalize score (Handle both 0-1 float and 0-100 int)
        raw_score = analysis_data.get("score", 0)
        if isinstance(raw_score, float) and 0.0 <= raw_score <= 1.0:
            # Convert 0.8 → 80
            match_score = int(raw_score * 100)
        else:
            # Ensure it's an integer, handle any other case
            match_score = int(raw_score)

        # Validate required keys exist
        required_keys = ["missing_keywords", "advice"]
        for key in required_keys:
            if key not in analysis_data:
                analysis_data[key] = []  # Default to empty list if missing

        # 5. Save to Supabase (limit text size to save space)
        supabase.table("resume_analyses").insert({
            "resume_text": resume_text[:1000],
            "job_description": job_description[:1000],
            "match_score": match_score,  # Now a safe integer 0-100
            "feedback": analysis_data
        }).execute()

        return {
            "score": match_score,
            "missing_keywords": analysis_data.get("missing_keywords", []),
            "advice": analysis_data.get("advice", [])
        }

    except Exception as e:
        print(f"Server Error: {e}")
        # Specifically catch authentication or quota issues
        if "401" in str(e):
            raise HTTPException(status_code=401, detail="Invalid Groq API Key")
        if "429" in str(e):
            raise HTTPException(status_code=429, detail="Groq Quota Exceeded. Try again later.")
        
        raise HTTPException(status_code=500, detail=str(e))