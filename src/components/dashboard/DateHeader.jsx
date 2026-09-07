import React from 'react';
import { Calendar as CalendarIcon, Sparkles } from 'lucide-react';

export default function DateHeader() {
  const now = new Date();
  
  const gregorianDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-brown-200/40 dark:border-brown-800/40">
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-gold-700 dark:text-gold-400 font-sans tracking-wide uppercase">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Today's UPSC Desk &bull; {gregorianDate}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-900 dark:text-cream-100 tracking-tight mt-1">
          Daily Newspaper Companion
        </h1>
      </div>

      <div className="flex items-center gap-2 text-xs font-serif italic text-brown-600 dark:text-cream-300 bg-brown-50/60 dark:bg-brown-900/30 px-3.5 py-1.5 rounded-full border border-brown-200/50 dark:border-brown-800/50 self-start sm:self-auto">
        <Sparkles className="w-3.5 h-3.5 text-gold-500 shrink-0" />
        <span>"Consistency converts effort into excellence."</span>
      </div>
    </div>
  );
}
