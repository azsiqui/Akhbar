import React from 'react';
import { Newspaper, BookOpen, FileText, Sun, Moon } from 'lucide-react';

export default function TopHeader({
  activeView,
  setActiveView,
  isDarkMode,
  onToggleDarkMode
}) {
  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-cream-100/90 dark:bg-academic-paperDark/90 backdrop-blur-md border-b border-brown-200/50 dark:border-academic-borderDark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-9 h-9 rounded-xl bg-brown-500 dark:bg-gold-400 flex items-center justify-center text-cream-100 dark:text-brown-950 font-serif font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              أ
            </div>
            <div className="text-left">
              <span className="font-serif font-bold text-xl text-brown-900 dark:text-cream-100 tracking-tight block leading-none">
                Akhbar
              </span>
              <span className="text-[10px] text-brown-500 dark:text-cream-400 font-sans">
                {todayStr}
              </span>
            </div>
          </button>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1.5 bg-cream-50 dark:bg-brown-900/40 p-1 rounded-xl border border-brown-200/60 dark:border-brown-800 text-xs font-semibold">
          <button
            onClick={() => setActiveView('dashboard')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeView === 'dashboard'
                ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-xs'
                : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60'
            }`}
          >
            <Newspaper className="w-3.5 h-3.5" />
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => setActiveView('notes')}
            className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
              activeView === 'notes'
                ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-xs'
                : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>GS Notes</span>
          </button>
        </div>

        {/* Theme Toggle */}
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? 'Switch to Light Cream Academic' : 'Switch to Dark Espresso Academic'}
          className="p-2 rounded-xl bg-brown-50 dark:bg-brown-900/60 hover:bg-gold-50 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-200 border border-brown-200/60 dark:border-brown-700 transition-all"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-gold-400" /> : <Moon className="w-4 h-4 text-brown-600" />}
        </button>

      </div>
    </header>
  );
}
