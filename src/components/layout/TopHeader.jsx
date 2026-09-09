import React, { useState, useEffect } from 'react';
import { Newspaper, FileText, Sun, Moon, Clock, Megaphone } from 'lucide-react';

export default function TopHeader({
  activeView,
  setActiveView,
  isDarkMode,
  onToggleDarkMode,
  onOpenAnnouncement,
  hasUnreadAnnouncement
}) {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      }));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const todayStr = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="sticky top-0 z-30 bg-cream-100/90 dark:bg-academic-paperDark/90 backdrop-blur-md border-b border-brown-200/50 dark:border-academic-borderDark transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3 sm:gap-4">
        
        {/* Brand: Logo 'أ' + Title: Arshi's Desk + Date Subtext */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveView('dashboard')}
            className="flex items-center gap-2.5 group text-left"
          >
            <div className="w-9 h-9 rounded-xl bg-brown-500 dark:bg-gold-400 flex items-center justify-center text-cream-100 dark:text-brown-950 font-serif font-bold text-lg shadow-xs group-hover:scale-105 transition-transform">
              أ
            </div>
            <div>
              <span className="font-serif font-bold text-base sm:text-xl text-brown-900 dark:text-cream-100 tracking-tight block leading-none">
                Arshi's Desk
              </span>
              <span className="text-[10px] text-brown-500 dark:text-cream-400 font-sans mt-0.5 block">
                {todayStr}
              </span>
            </div>
          </button>
        </div>

        {/* Live Digital Clock in Header */}
        <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-xl bg-brown-50/80 dark:bg-brown-900/40 border border-brown-200/50 dark:border-brown-800 text-xs font-mono font-bold text-brown-800 dark:text-gold-300 shadow-xs">
          <Clock className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
          <span>{currentTime}</span>
        </div>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2">
          
          {/* Announcement Button with Unread Badge */}
          <button
            onClick={onOpenAnnouncement}
            title="View Latest Announcement"
            className="relative p-2 sm:px-3 sm:py-1.5 rounded-xl bg-gold-50/80 dark:bg-brown-900/60 hover:bg-gold-100 dark:hover:bg-brown-800 text-brown-800 dark:text-gold-200 border border-gold-300/60 dark:border-gold-700/50 flex items-center gap-1.5 text-xs font-semibold transition-all shadow-xs"
          >
            <Megaphone className="w-4 h-4 text-gold-600 dark:text-gold-400" />
            <span className="hidden sm:inline">Announcement</span>

            {/* Notification Badge 1 / Dot */}
            {hasUnreadAnnouncement && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-xs animate-bounce">
                1
              </span>
            )}
          </button>

          {/* View Tabs */}
          <div className="flex items-center gap-1 bg-cream-50 dark:bg-brown-900/40 p-1 rounded-xl border border-brown-200/60 dark:border-brown-800 text-xs font-semibold">
            <button
              onClick={() => setActiveView('dashboard')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeView === 'dashboard'
                  ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-xs'
                  : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setActiveView('notes')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all ${
                activeView === 'notes'
                  ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-xs'
                  : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GS Notes</span>
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

      </div>
    </header>
  );
}
