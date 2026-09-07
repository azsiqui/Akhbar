import React, { useState } from 'react';
import { RefreshCw, Heart, Sparkles, BookOpen, Copy, Check } from 'lucide-react';
import { DUAS_COLLECTION, getRandomDua } from '../../data/duas';

export default function DuaBanner() {
  const [currentDua, setCurrentDua] = useState(getRandomDua());
  const [copied, setCopied] = useState(false);
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
    }, 200);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${currentDua.translation}" - (${currentDua.transliteration})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brown-50 via-cream-100 to-amber-50/60 dark:from-academic-cardDark dark:via-brown-900/40 dark:to-academic-cardDark border border-gold-300/60 dark:border-gold-500/30 p-5 shadow-academic transition-all duration-300">
      {/* Decorative Gold Corner Accents */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-gold-400/15 via-gold-300/5 to-transparent rounded-bl-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-forest-500/10 via-transparent to-transparent rounded-tr-full pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gold-100 text-gold-800 dark:bg-gold-900/50 dark:text-gold-300 border border-gold-300/50">
              <Sparkles className="w-3.5 h-3.5 text-gold-600 dark:text-gold-400" />
              Dua for Arshi &bull; {currentDua.category}
            </span>
            <span className="text-xs text-brown-400 dark:text-brown-300 font-medium">
              Daily Barakah
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline gap-3 pt-1">
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-brown-900 dark:text-gold-200 tracking-wide">
              {currentDua.arabic}
            </h3>
            <span className="text-xs italic text-brown-600 dark:text-cream-300 font-serif">
              ({currentDua.transliteration})
            </span>
          </div>

          <p className="text-sm sm:text-base font-serif italic text-brown-800 dark:text-cream-100 leading-relaxed pt-0.5">
            "{currentDua.translation}"
          </p>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center shrink-0 pt-2 md:pt-0">
          <button
            onClick={handleCopy}
            title="Copy Dua text"
            className="p-2 rounded-xl bg-white/80 dark:bg-brown-800/80 hover:bg-gold-50 dark:hover:bg-brown-700 text-brown-700 dark:text-gold-300 border border-brown-200/60 dark:border-brown-700 text-xs font-medium flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-forest-600 dark:text-forest-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span className="hidden sm:inline">Copy</span>
              </>
            )}
          </button>

          <button
            onClick={handleNextDua}
            title="Load another Dua for Arshi"
            className="p-2 px-3 rounded-xl bg-gold-400 hover:bg-gold-500 text-brown-950 font-medium text-xs flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <RefreshCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
            <span>New Dua</span>
          </button>
        </div>
      </div>
    </div>
  );
}
