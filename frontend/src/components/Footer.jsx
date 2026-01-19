import React from 'react';

const Footer = () => {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-slate-600 dark:text-slate-400">
            © {new Date().getFullYear()} ResumePro. All rights reserved.
          </p>
          <div className="flex items-center gap-4 sm:gap-6 text-sm text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              <span className="text-xs sm:text-sm">Secure</span>
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              <span className="text-xs sm:text-sm">AI Powered</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
