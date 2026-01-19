import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import ResumeUploader from './components/ResumeUploader';
import ResultsDashboard from './components/ResultsDashboard';

function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
    updateTheme(isDark);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      setDarkMode(e.matches);
      updateTheme(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const updateTheme = (isDark) => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    updateTheme(newDarkMode);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !jobDescription) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('job_description', jobDescription);

    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Analysis failed');
      }

      const data = await response.json();
      setResult(data);

      setTimeout(() => {
        const results = document.getElementById('results-section');
        if (results) {
          results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);

    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong! Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setFile(null);
    setJobDescription('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen font-sans">
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {!result ? (
          <div className="animate-in fade-in slide-in-from-bottom-4 space-y-10 sm:space-y-12">
            <Hero />
            <ResumeUploader
              file={file}
              setFile={setFile}
              jobDescription={jobDescription}
              setJobDescription={setJobDescription}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        ) : (
          <div id="results-section">
            <ResultsDashboard result={result} resetAnalysis={resetAnalysis} />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
