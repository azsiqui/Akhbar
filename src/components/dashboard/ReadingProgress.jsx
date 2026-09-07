import React from 'react';
import { CheckCircle2, BookOpen, FileText, Target, Award } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ReadingProgress({ progress, todayCompleted, onToggleTodayComplete }) {
  const handleToggle = () => {
    const nextState = !todayCompleted;
    onToggleTodayComplete(nextState);
    if (nextState) {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
        colors: ['#355E3B', '#C89B3C', '#F8F4EC']
      });
    }
  };

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-5 shadow-academic space-y-4">
      
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100 flex items-center gap-2">
          <Target className="w-5 h-5 text-forest-600 dark:text-forest-400" />
          Reading Progress
        </h3>
        <span className="text-xs text-brown-500 dark:text-cream-400 font-sans">
          UPSC Daily Checklist
        </span>
      </div>

      {/* Main Checkbox Card */}
      <button
        onClick={handleToggle}
        className={`w-full p-4 rounded-xl border flex items-center justify-between transition-all duration-300 ${
          todayCompleted
            ? 'bg-forest-50 dark:bg-forest-950/40 border-forest-400/80 text-forest-900 dark:text-forest-200 shadow-sm'
            : 'bg-cream-50/80 dark:bg-brown-900/40 border-brown-200/60 dark:border-brown-800 text-brown-800 dark:text-cream-200 hover:bg-gold-50/50'
        }`}
      >
        <div className="flex items-center gap-3 text-left">
          <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-colors ${
            todayCompleted
              ? 'bg-forest-600 border-forest-600 text-white'
              : 'border-brown-300 dark:border-brown-600 bg-white dark:bg-brown-900'
          }`}>
            {todayCompleted && <CheckCircle2 className="w-4 h-4" />}
          </div>
          <div>
            <h4 className="font-serif font-bold text-sm leading-tight">
              Today's Newspaper Completed
            </h4>
            <p className="text-xs opacity-80 mt-0.5">
              {todayCompleted ? 'Mashallah Arshi! Daily quota done.' : 'Click when you finish reading today\'s paper.'}
            </p>
          </div>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          todayCompleted
            ? 'bg-forest-600 text-white'
            : 'bg-gold-100 text-gold-900 dark:bg-gold-950 dark:text-gold-300'
        }`}>
          {todayCompleted ? 'Completed' : 'Pending'}
        </span>
      </button>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-2 gap-3 pt-1">
        <div className="p-3 rounded-xl bg-brown-50/60 dark:bg-brown-900/30 border border-brown-200/40 dark:border-brown-800/40 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-brown-200/60 dark:bg-brown-800 text-brown-800 dark:text-gold-300">
            <BookOpen className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-serif font-bold text-brown-900 dark:text-cream-100">
              {progress?.total_papers_read || 48}
            </div>
            <div className="text-[11px] text-brown-500 dark:text-cream-400 font-sans">
              Papers Completed
            </div>
          </div>
        </div>

        <div className="p-3 rounded-xl bg-brown-50/60 dark:bg-brown-900/30 border border-brown-200/40 dark:border-brown-800/40 flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gold-200/60 dark:bg-gold-950 text-gold-800 dark:text-gold-300">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-lg font-serif font-bold text-brown-900 dark:text-cream-100">
              {progress?.total_notes_created || 32}
            </div>
            <div className="text-[11px] text-brown-500 dark:text-cream-400 font-sans">
              GS Notes Filed
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
