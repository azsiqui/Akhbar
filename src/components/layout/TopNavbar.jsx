import React from 'react';
import { Newspaper, Flame, Sun, Moon, Search, Upload, HelpCircle, BookOpen, Heart } from 'lucide-react';

export default function TopNavbar({
  isDarkMode,
  onToggleDarkMode,
  searchQuery,
  onSearchChange,
  streakCount = 14,
  onOpenUpload,
  onOpenPdfGuide,
  activeTab,
  setActiveTab
}) {
  const todayFormatted = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-cream-100/90 dark:bg-academic-paperDark/90 backdrop-blur-md border-b border-brown-200/50 dark:border-academic-borderDark transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Brand & Personal Greeting */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-10 h-10 rounded-xl bg-brown-500 dark:bg-gold-400 flex items-center justify-center text-cream-100 dark:text-brown-950 font-serif font-bold text-xl shadow-academic group-hover:scale-105 transition-transform">
              أ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-xl text-brown-900 dark:text-cream-100 tracking-tight">
                  Akhbar
                </span>
                <span className="text-xs font-serif text-gold-600 dark:text-gold-400 font-semibold px-2 py-0.5 rounded-md bg-gold-100/80 dark:bg-gold-950/60 border border-gold-300/40">
                  UPSC
                </span>
              </div>
              <p className="text-xs text-brown-600 dark:text-cream-300 font-serif italic hidden sm:block">
                As-salamu alaykum Arshi &bull; {todayFormatted}
              </p>
            </div>
          </button>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400 dark:text-cream-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search notes, GS papers, editorials..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full bg-white/80 dark:bg-academic-cardDark/80 text-brown-900 dark:text-cream-100 border border-brown-200/80 dark:border-brown-800 placeholder-brown-400 dark:placeholder-cream-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50 shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-brown-400 hover:text-brown-700 dark:hover:text-cream-100"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Action Controls & Utilities */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Reading Streak Badge */}
          <div 
            title="Arshi's Reading Streak"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 border border-amber-300/60 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-semibold shadow-sm"
          >
            <Flame className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>{streakCount} Day Streak</span>
          </div>

          {/* Upload Daily PDF Button */}
          <button
            onClick={onOpenUpload}
            title="Upload Today's Newspaper PDF"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-forest-500 hover:bg-forest-600 text-white text-xs font-medium shadow-sm transition-all active:scale-95"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload PDF</span>
          </button>

          {/* PDF Guide Button */}
          <button
            onClick={onOpenPdfGuide}
            title="How to get daily newspapers free"
            className="p-2 rounded-xl bg-brown-50 dark:bg-brown-900/60 hover:bg-gold-50 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-200 border border-brown-200/60 dark:border-brown-700 text-xs transition-all"
          >
            <HelpCircle className="w-4 h-4 text-gold-600 dark:text-gold-400" />
          </button>

          {/* Dark / Light Academic Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Cream Academic' : 'Switch to Dark Espresso Academic'}
            className="p-2 rounded-xl bg-brown-50 dark:bg-brown-900/60 hover:bg-gold-50 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-200 border border-brown-200/60 dark:border-brown-700 text-xs transition-all"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-gold-400" />
            ) : (
              <Moon className="w-4 h-4 text-brown-600" />
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
