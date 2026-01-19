import React from 'react';
import { CheckCircle, AlertTriangle, Lightbulb, ArrowRight, TrendingUp } from 'lucide-react';

const ResultsDashboard = ({ result, resetAnalysis }) => {
  if (!result) return null;

  const { score, missing_keywords, advice } = result;

  const getScoreConfig = (s) => {
    if (s >= 80) {
      return {
        color: 'green',
        bg: 'bg-green-50 dark:bg-green-950/30',
        text: 'text-green-600 dark:text-green-500',
        border: 'border-green-200 dark:border-green-900/50',
        title: 'Excellent Match',
        description: 'Your resume is well-aligned with the job description and has a high likelihood of passing ATS filters.'
      };
    }
    if (s >= 50) {
      return {
        color: 'amber',
        bg: 'bg-amber-50 dark:bg-amber-950/30',
        text: 'text-amber-600 dark:text-amber-500',
        border: 'border-amber-200 dark:border-amber-900/50',
        title: 'Good Foundation',
        description: 'Your resume shows relevant skills, but could benefit from optimization to improve ATS ranking.'
      };
    }
    return {
      color: 'red',
      bg: 'bg-red-50 dark:bg-red-950/30',
      text: 'text-red-600 dark:text-red-500',
      border: 'border-red-200 dark:border-red-900/50',
      title: 'Needs Improvement',
      description: 'There are significant gaps between your resume and the job requirements. Consider major revisions.'
    };
  };

  const scoreConfig = getScoreConfig(score);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 space-y-8">
      <div className="card-base p-6 sm:p-8">
        <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="flex-shrink-0">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 flex items-center justify-center ${scoreConfig.bg} ${scoreConfig.border}`}>
              <div className="text-center">
                <span className={`text-4xl sm:text-5xl font-bold ${scoreConfig.text}`}>
                  {score}
                </span>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wide">
                  Match
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <TrendingUp size={20} className={scoreConfig.text} />
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {scoreConfig.title}
              </h2>
            </div>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              {scoreConfig.description}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card-base p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-950/30">
              <AlertTriangle size={20} className="text-red-600 dark:text-red-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Missing Keywords
            </h3>
          </div>

          <div className="flex-1">
            {missing_keywords && missing_keywords.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {missing_keywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 font-medium text-sm border border-red-200 dark:border-red-900/30"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <CheckCircle size={48} className="text-green-600 dark:text-green-500 mb-3 opacity-40" />
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  All keywords present
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="card-base p-6 sm:p-8 flex flex-col">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30">
              <Lightbulb size={20} className="text-amber-600 dark:text-amber-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Suggestions
            </h3>
          </div>

          <div className="flex-1">
            {advice && advice.length > 0 ? (
              <ul className="space-y-4">
                {advice.map((tip, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-2 min-w-[5px] h-1.5 rounded-full bg-amber-500 flex-shrink-0"></div>
                    <span className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                      {tip}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Your resume looks solid!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
        <button
          onClick={resetAnalysis}
          className="group px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-lg font-semibold text-sm sm:text-base hover:bg-slate-800 dark:hover:bg-slate-50 transition-all focus-ring flex items-center gap-2"
        >
          <span>Analyze Another Resume</span>
          <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default ResultsDashboard;
