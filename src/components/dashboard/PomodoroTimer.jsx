import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Timer, Coffee, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PomodoroTimer() {
  const [mode, setMode] = useState('focus'); // 'focus' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedSessions, setCompletedSessions] = useState(3);

  const MODES = {
    focus: { name: 'Deep Study', duration: 25 * 60, color: 'bg-brown-500 text-cream-100' },
    shortBreak: { name: '5m Break', duration: 5 * 60, color: 'bg-forest-500 text-white' },
    longBreak: { name: '15m Break', duration: 15 * 60, color: 'bg-gold-500 text-brown-950' }
  };

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
      if (mode === 'focus') {
        setCompletedSessions(prev => prev + 1);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const handleSwitchMode = (newMode) => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(MODES[newMode].duration);
  };

  const toggleTimer = () => setIsRunning(!isRunning);

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode].duration);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const totalMinutesToday = completedSessions * 25;

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-5 shadow-academic space-y-4">
      
      {/* Top Title & Presets */}
      <div className="flex items-center justify-between">
        <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100 flex items-center gap-2">
          <Timer className="w-5 h-5 text-gold-600 dark:text-gold-400" />
          Pomodoro Study Clock
        </h3>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brown-100 dark:bg-brown-900 text-brown-800 dark:text-cream-200">
          {totalMinutesToday} mins today
        </span>
      </div>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-3 gap-1.5 p-1 rounded-xl bg-brown-50 dark:bg-brown-900/40 border border-brown-200/40 dark:border-brown-800/40">
        <button
          onClick={() => handleSwitchMode('focus')}
          className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
            mode === 'focus'
              ? 'bg-brown-500 text-cream-100 shadow-sm'
              : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60 dark:hover:bg-brown-800/40'
          }`}
        >
          25m Focus
        </button>
        <button
          onClick={() => handleSwitchMode('shortBreak')}
          className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
            mode === 'shortBreak'
              ? 'bg-forest-500 text-white shadow-sm'
              : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60 dark:hover:bg-brown-800/40'
          }`}
        >
          5m Break
        </button>
        <button
          onClick={() => handleSwitchMode('longBreak')}
          className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
            mode === 'longBreak'
              ? 'bg-gold-400 text-brown-950 shadow-sm'
              : 'text-brown-700 dark:text-cream-300 hover:bg-brown-100/60 dark:hover:bg-brown-800/40'
          }`}
        >
          15m Break
        </button>
      </div>

      {/* Timer Clock Display */}
      <div className="flex flex-col items-center justify-center py-3 bg-cream-50/60 dark:bg-brown-900/20 rounded-xl border border-brown-200/40 dark:border-brown-800/40">
        <div className="text-4xl sm:text-5xl font-mono font-bold text-brown-900 dark:text-gold-200 tracking-wider">
          {formattedTime}
        </div>
        <p className="text-xs text-brown-500 dark:text-cream-400 font-sans mt-1">
          {isRunning ? '⏳ Focused UPSC Reading...' : 'Paused'}
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleTimer}
          className={`flex-1 py-2 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95 ${
            isRunning
              ? 'bg-amber-600 text-white hover:bg-amber-700'
              : 'bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950'
          }`}
        >
          {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{isRunning ? 'Pause Timer' : 'Start Focus Session'}</span>
        </button>

        <button
          onClick={resetTimer}
          title="Reset Clock"
          className="p-2.5 rounded-xl bg-brown-100 dark:bg-brown-800/60 hover:bg-brown-200 text-brown-700 dark:text-cream-200 border border-brown-200/60 transition-all active:scale-90"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
}
