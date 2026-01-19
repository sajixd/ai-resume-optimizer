import React from 'react';
import { CheckCircle, Shield, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <div className="text-center max-w-3xl mx-auto space-y-6">
      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-400 text-sm font-medium border border-blue-100 dark:border-blue-900/50">
        <Zap size={14} />
        <span>AI-Powered ATS Analysis</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
        Optimize Your Resume for <br className="hidden sm:block" />
        <span className="text-blue-600 dark:text-blue-500">
          Better Job Matches
        </span>
      </h1>

      <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
        Align your resume with job requirements using AI analysis to increase your chances of passing applicant tracking systems.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 pt-2">
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <CheckCircle size={16} className="text-green-600 dark:text-green-500" />
          <span>ATS Optimized</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Shield size={16} className="text-blue-600 dark:text-blue-500" />
          <span>Private & Secure</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
          <Zap size={16} className="text-amber-600 dark:text-amber-500" />
          <span>Instant Results</span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
