import React, { useState } from 'react';
import { BookCheck, ChevronDown, ChevronUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { UPSC_SYLLABUS, GS_CATEGORIES } from '../../data/upscSyllabus';

export default function SyllabusView() {
  const [activeGs, setActiveGs] = useState('GS3');

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-brown-200/40 dark:border-brown-800/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-700 dark:text-gold-400 font-sans tracking-wide uppercase">
            <BookCheck className="w-3.5 h-3.5" />
            <span>UPSC Companion</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-900 dark:text-cream-100 tracking-tight mt-1">
            General Studies Syllabus Breakdown
          </h1>
        </div>

        <p className="text-xs text-brown-600 dark:text-cream-300 font-serif italic max-w-sm">
          Use this reference to tag your newspaper notes & map daily editorials directly to syllabus micro-topics.
        </p>
      </div>

      {/* GS Category Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {['GS1', 'GS2', 'GS3', 'GS4'].map(gs => {
          const categoryObj = GS_CATEGORIES.find(c => c.id === gs);
          const isActive = activeGs === gs;
          return (
            <button
              key={gs}
              onClick={() => setActiveGs(gs)}
              className={`px-4 py-2 rounded-xl font-serif font-bold text-sm transition-all whitespace-nowrap shadow-sm ${
                isActive
                  ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 scale-105'
                  : 'bg-white dark:bg-academic-cardDark text-brown-800 dark:text-cream-200 border border-brown-200/60 dark:border-academic-borderDark hover:bg-gold-50'
              }`}
            >
              {categoryObj.label}
            </button>
          );
        })}
      </div>

      {/* Micro-topics Breakdown Grid */}
      <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-6 shadow-academic space-y-4">
        <h3 className="font-serif font-bold text-xl text-brown-900 dark:text-gold-200 flex items-center gap-2 border-b pb-3 border-brown-200/40 dark:border-brown-800">
          <Sparkles className="w-5 h-5 text-gold-500" />
          {GS_CATEGORIES.find(c => c.id === activeGs)?.label} Micro-Topics
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {UPSC_SYLLABUS[activeGs].map((topic, index) => (
            <div
              key={index}
              className="p-3.5 rounded-xl bg-cream-50/60 dark:bg-brown-900/30 border border-brown-200/40 dark:border-brown-800/40 flex items-start gap-3 hover:border-gold-400 transition-all"
            >
              <span className="w-6 h-6 rounded-lg bg-brown-200/80 dark:bg-brown-800 text-brown-900 dark:text-gold-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                {index + 1}
              </span>
              <div>
                <h4 className="font-serif font-bold text-sm text-brown-900 dark:text-cream-100">
                  {topic}
                </h4>
                <p className="text-xs text-brown-600 dark:text-cream-300 font-sans mt-0.5">
                  Regularly featured in daily editorials & Mains questions.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
