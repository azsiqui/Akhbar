import React, { useState } from 'react';
import { RefreshCw, Sparkles, Heart, Pin } from 'lucide-react';
import { DUAS_COLLECTION, getRandomDua } from '../../data/duas';

export default function StickyDuaNote() {
  const [currentDua, setCurrentDua] = useState(getRandomDua());
  const [isRotating, setIsRotating] = useState(false);

  const handleNextDua = () => {
    setIsRotating(true);
    setTimeout(() => {
      let next;
      do {
        next = getRandomDua();
      } while (next.id === currentDua.id && DUAS_COLLECTION.length > 1);
      setCurrentDua(next);
      setIsRotating(false);
    }, 180);
  };

  return (
    <div className="relative group max-w-2xl mx-auto my-2">
      {/* Sticky Note Pin / Tape Header */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
        <div className="w-20 h-6 bg-amber-200/80 dark:bg-amber-800/60 backdrop-blur-xs border border-amber-300/60 rounded-sm shadow-xs rotate-[-1deg]" />
      </div>

      {/* Sticky Note Parchment Body */}
      <div className="relative bg-gradient-to-b from-[#FEF9C3] via-[#FEF08A] to-[#FDE047] dark:from-[#322514] dark:via-[#281D0F] dark:to-[#1F170C] text-amber-950 dark:text-amber-100 p-5 sm:p-6 rounded-2xl border border-amber-300/80 dark:border-amber-700/60 shadow-xl transform rotate-[-0.5deg] hover:rotate-0 transition-transform duration-300 overflow-hidden">
        
        {/* Subtle Paper Lines Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,#000000_1px,transparent_1px)] bg-[size:100%_24px] pointer-events-none" />

        <div className="relative z-10 space-y-3">
          
          {/* Top Greeting Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-serif font-bold text-xl sm:text-2xl text-brown-950 dark:text-gold-200 tracking-tight flex items-center gap-2">
                Salam Arshi! <Heart className="w-5 h-5 text-rose-600 fill-rose-500 animate-pulse" />
              </h2>
            </div>

            <button
              onClick={handleNextDua}
              title="Read another Dua for Arshi"
              className="p-1.5 rounded-full bg-amber-300/60 dark:bg-amber-900/60 hover:bg-amber-400 dark:hover:bg-amber-800 text-amber-950 dark:text-amber-200 transition-all active:scale-90 flex items-center gap-1 text-xs font-semibold px-2.5 shadow-xs"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">New Dua</span>
            </button>
          </div>

          {/* Arabic Transliteration & Translation */}
          <div className="space-y-1 pt-1">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="font-serif font-bold text-lg sm:text-xl text-brown-900 dark:text-gold-300">
                {currentDua.arabic}
              </h3>
              <span className="text-[11px] font-semibold text-amber-800 dark:text-amber-400 font-sans uppercase tracking-wider">
                {currentDua.category}
              </span>
            </div>

            <p className="font-serif italic text-sm sm:text-base text-amber-950/90 dark:text-cream-100 leading-relaxed pt-1">
              "{currentDua.translation}"
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
