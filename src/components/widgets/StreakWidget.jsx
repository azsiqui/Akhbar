import React from 'react';
import { Flame, CheckCircle2, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StreakWidget({ streak, onToggleTodayComplete }) {
  const count = streak?.streak_count || 14;
  const isTodayCompleted = streak?.today_completed || false;

  const handleToggle = () => {
    const nextState = !isTodayCompleted;
    onToggleTodayComplete(nextState);
    if (nextState) {
      confetti({ particleCount: 70, spread: 60, origin: { y: 0.6 } });
    }
  };

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-4 sm:p-5 shadow-academic flex flex-col justify-between space-y-3">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-sm">
            <Flame className="w-5 h-5 fill-amber-100 animate-pulse" />
          </div>
          <div>
            <div className="font-serif font-bold text-xl text-brown-900 dark:text-gold-200">
              {count} Day Streak
            </div>
            <p className="text-[11px] text-brown-500 dark:text-cream-400 font-sans">
              Daily Reading Habit
            </p>
          </div>
        </div>

        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
          isTodayCompleted
            ? 'bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300'
            : 'bg-gold-100 text-gold-900 dark:bg-gold-950 dark:text-gold-300'
        }`}>
          {isTodayCompleted ? '✓ Done' : 'In Progress'}
        </span>
      </div>

      <button
        onClick={handleToggle}
        className={`w-full py-2 px-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
          isTodayCompleted
            ? 'bg-forest-50 dark:bg-forest-950/40 text-forest-700 dark:text-forest-300 border-forest-300'
            : 'bg-cream-50 dark:bg-brown-900/40 text-brown-800 dark:text-cream-200 border-brown-200/60 hover:bg-gold-50'
        }`}
      >
        <CheckCircle2 className={`w-4 h-4 ${isTodayCompleted ? 'text-forest-600' : 'text-brown-400'}`} />
        <span>{isTodayCompleted ? 'Today\'s Reading Completed!' : 'Mark Today Completed'}</span>
      </button>

    </div>
  );
}
