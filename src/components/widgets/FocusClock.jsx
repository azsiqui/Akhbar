import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FocusClock({
  timeLeft: propTimeLeft,
  isRunning: propIsRunning,
  mode: propMode,
  onToggle,
  onReset
}) {
  const [internalTimeLeft, setInternalTimeLeft] = useState(25 * 60);
  const [internalIsRunning, setInternalIsRunning] = useState(false);
  const [internalMode, setInternalMode] = useState('25m');

  const isControlled = propTimeLeft !== undefined;

  const timeLeft = isControlled ? propTimeLeft : internalTimeLeft;
  const isRunning = isControlled ? propIsRunning : internalIsRunning;
  const mode = isControlled ? propMode : internalMode;

  useEffect(() => {
    if (isControlled) return;
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => setInternalTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setInternalIsRunning(false);
      confetti({ particleCount: 50, spread: 50, origin: { y: 0.7 } });
    }
    return () => clearInterval(timer);
  }, [isControlled, isRunning, timeLeft]);

  const toggle = () => {
    if (isControlled && onToggle) onToggle();
    else setInternalIsRunning(!internalIsRunning);
  };

  const reset = (m = mode) => {
    if (isControlled && onReset) onReset(m);
    else {
      setInternalIsRunning(false);
      setInternalMode(m);
      setInternalTimeLeft(m === '25m' ? 25 * 60 : 5 * 60);
    }
  };

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const timeStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-4 sm:p-5 shadow-academic flex flex-col justify-between space-y-3">
      
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Timer className={`w-5 h-5 ${isRunning ? 'text-gold-500 animate-pulse' : 'text-gold-600 dark:text-gold-400'}`} />
          <h3 className="font-serif font-bold text-base text-brown-900 dark:text-cream-100 flex items-center gap-2">
            Focus Clock
            {isRunning && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-forest-500/20 text-forest-700 dark:text-forest-300 font-sans font-semibold">
                Running
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => reset('25m')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              mode === '25m'
                ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950'
                : 'bg-brown-50 dark:bg-brown-900 text-brown-600'
            }`}
          >
            25m
          </button>
          <button
            onClick={() => reset('5m')}
            className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all ${
              mode === '5m'
                ? 'bg-forest-500 text-white'
                : 'bg-brown-50 dark:bg-brown-900 text-brown-600'
            }`}
          >
            5m
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between bg-cream-50/60 dark:bg-brown-900/30 p-2.5 px-4 rounded-xl border border-brown-200/40 dark:border-brown-800">
        <div className="text-2xl font-mono font-bold text-brown-900 dark:text-gold-200 tracking-wider">
          {timeStr}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={toggle}
            className="p-2 rounded-xl bg-brown-500 hover:bg-brown-600 text-cream-100 dark:bg-gold-400 dark:hover:bg-gold-500 dark:text-brown-950 font-bold transition-all shadow-xs"
          >
            {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          <button
            onClick={() => reset()}
            className="p-2 rounded-xl bg-brown-100 dark:bg-brown-800 text-brown-700 dark:text-cream-300 hover:bg-brown-200 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
}
