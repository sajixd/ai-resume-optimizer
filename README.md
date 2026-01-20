# AI Resume Optimizer 🚀

An intelligent AI-powered platform that analyzes your resume against a job description, provides a match score, identifies missing keywords, and gives actionable advice to land your dream job.

## ✨ Features

- **PDF Resume Upload**: Securely upload your resume in PDF format.
- **Job Description Analysis**: Paste the job description you're targeting.
- **AI Matching Score**: Get a real-time percentage matching score powered by Llama 3.3-70B.
- **Keyword Identification**: Uncover missing industry-standard keywords.
- **Personalized Advice**: Receive specific tips to improve your resume for a particular role.
- **Minimalist & Modern UI**: A sleek, premium experience built with Tailind CSS 4.

## 🛠️ Tech Stack

### Frontend
- **React 19** (Vite)
- **Tailwind CSS 4** (Modern utility-first styling)
- **Lucide React** (Beautifully simple icons)
- **Framer Motion** (Subtle animations)

### Backend
- **FastAPI** (High-performance Python framework)
- **Groq AI** (Llama 3.3 70B model for lightning-fast analysis)
- **PyMuPDF** (Robust PDF text extraction)
- **Supabase** (Database storage for analysis history)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- Python (3.9+)
- Groq API Key
- Supabase Project URL & Key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sajixd/ai-resume-optimizer.git
   cd ai-resume-optimizer
   ```

2. **Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **Backend Setup**
   ```bash
   cd ../backend
   # Create a virtual environment
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   
   # Install dependencies
   pip install -r requirements.txt
   
   # Setup environment variables
   # Create a .env file and add your keys:
   # GROQ_API_KEY=your_key
   # SUPABASE_URL=your_url
   # SUPABASE_KEY=your_key
   
   # Run the server
   fastapi dev main.py
   ```

## 📸 Screenshots

*(Add screenshots here)*

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by [sajixd](https://github.com/sajixd)
