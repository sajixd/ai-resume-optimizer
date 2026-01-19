import React, { useState } from 'react';
import { Upload, FileText, X, ArrowRight, Loader2 } from 'lucide-react';

const ResumeUploader = ({
  file,
  setFile,
  jobDescription,
  setJobDescription,
  handleSubmit,
  loading
}) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      }
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const isFormValid = file && jobDescription.trim().length > 0;

  return (
    <form onSubmit={handleSubmit} className="card-base p-6 sm:p-8 space-y-6 sm:space-y-8">
      <div className="space-y-6 sm:space-y-8">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label htmlFor="job-description" className="text-base font-semibold text-slate-900 dark:text-white">
              Job Description
            </label>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              Required
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Paste the complete job description for keyword analysis.
          </p>
          <div className="relative">
            <textarea
              id="job-description"
              className="w-full h-48 sm:h-56 p-4 text-sm bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500"
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              required
            />
            <div className="absolute bottom-3 right-3 text-xs font-medium text-slate-400 dark:text-slate-500">
              {jobDescription.length} characters
            </div>
          </div>
        </div>

        <div className="section-divider" />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-base font-semibold text-slate-900 dark:text-white">
              Resume Upload
            </label>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
              PDF Only
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Upload your resume as a PDF document.
          </p>

          {!file ? (
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`h-48 sm:h-56 border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 text-center transition-all cursor-pointer ${dragActive
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-blue-400 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                }`}
            >
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="flex flex-col items-center cursor-pointer w-full h-full justify-center">
                <div className="w-14 h-14 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4 text-slate-500 dark:text-slate-400">
                  <Upload size={24} />
                </div>
                <h3 className="font-medium text-slate-900 dark:text-white mb-1">
                  Click to upload or drag and drop
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PDF file, up to 10MB
                </p>
              </label>
            </div>
          ) : (
            <div className="h-48 sm:h-56 bg-slate-50 dark:bg-slate-950/50 border-2 border-blue-500/30 rounded-xl p-6 flex flex-col items-center justify-center relative">
              <button
                onClick={removeFile}
                type="button"
                className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 text-slate-400 hover:text-red-600 transition-colors"
                title="Remove file"
              >
                <X size={16} />
              </button>
              <div className="w-16 h-16 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-3">
                <FileText size={32} className="text-blue-600 dark:text-blue-500" />
              </div>
              <p className="font-medium text-slate-900 dark:text-white truncate max-w-full px-4 text-sm">
                {file.name}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !isFormValid}
        className={`w-full sm:w-auto sm:min-w-[280px] py-3.5 px-6 rounded-xl font-semibold text-base flex items-center justify-center gap-2 transition-all focus-ring ${
          loading || !isFormValid
            ? 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
        }`}
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" />
            <span>Analyzing...</span>
          </>
        ) : (
          <>
            <span>Analyze Resume</span>
            <ArrowRight size={18} />
          </>
        )}
      </button>
    </form>
  );
};

export default ResumeUploader;
