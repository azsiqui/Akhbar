import React from 'react';
import { Flame, Trophy, Award, CheckCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function StreakWidget({ progress, onCelebrate }) {
  const streakDays = progress?.streak_count || 14;

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#C89B3C', '#355E3B', '#4B3425', '#F8F4EC']
    });
    if (onCelebrate) onCelebrate();
  };

  const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

  return (
    <div className="bg-gradient-to-br from-amber-500/10 via-white to-gold-500/5 dark:from-brown-900/50 dark:via-academic-cardDark dark:to-gold-950/20 rounded-2xl border border-gold-300/60 dark:border-gold-500/30 p-5 shadow-academic space-y-4">
      
      {/* Top Streak Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md animate-bounce">
            <Flame className="w-6 h-6 fill-amber-100" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-serif font-bold text-2xl text-brown-900 dark:text-gold-200">
                {streakDays} Days
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                🔥 Active Streak
              </span>
            </div>
            <p className="text-xs text-brown-600 dark:text-cream-300 font-sans">
              Arshi's Reading Streak &bull; Goal: 6 days / week
            </p>
          </div>
        </div>

        <button
          onClick={triggerConfetti}
          title="Celebrate Streak!"
          className="p-2 rounded-xl bg-gold-400 hover:bg-gold-500 text-brown-950 transition-transform active:scale-90 shadow-sm"
        >
          <Trophy className="w-5 h-5" />
        </button>
      </div>

      {/* Days of Week Tracker */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-xs font-semibold text-brown-700 dark:text-cream-300">
          <span>Weekly Activity</span>
          <span className="text-gold-700 dark:text-gold-400 font-bold">5 / 6 Days Completed</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {daysOfWeek.map((day, idx) => {
            const isDone = idx < 5;
            const isToday = idx === 5;
            return (
              <div
                key={idx}
                className={`flex flex-col items-center py-2 rounded-xl border text-xs transition-all ${
                  isDone
                    ? 'bg-forest-500 text-white border-forest-600 shadow-sm'
                    : isToday
                    ? 'bg-gold-100 dark:bg-gold-950/60 text-gold-900 dark:text-gold-300 border-gold-400 ring-2 ring-gold-400/40 font-bold'
                    : 'bg-brown-50 dark:bg-brown-900/30 text-brown-400 dark:text-cream-400 border-brown-200/40 dark:border-brown-800/40'
                }`}
              >
                <span className="text-[10px] font-sans opacity-80">{day}</span>
                <span className="font-bold text-xs mt-0.5">
                  {isDone ? '✓' : isToday ? '★' : '•'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Milestone Badge */}
      <div className="flex items-center gap-2 pt-2 border-t border-brown-200/30 dark:border-brown-800/30 text-xs text-brown-700 dark:text-cream-200">
        <Award className="w-4 h-4 text-gold-500 shrink-0" />
        <span>Next Milestone: <strong>21-Day UPSC Scholar Badge</strong> (7 days left)</span>
      </div>

    </div>
  );
}
