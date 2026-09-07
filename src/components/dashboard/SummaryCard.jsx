import React, { useState } from 'react';
import { Sparkles, BookMarked, Check, ListChecks, FileSpreadsheet, PlusCircle, ExternalLink } from 'lucide-react';

export default function SummaryCard({ summary, onCreateNoteFromSummary }) {
  const [copiedNote, setCopiedNote] = useState(false);

  if (!summary) return null;

  const handleCreateNote = () => {
    onCreateNoteFromSummary(summary);
  };

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-5 sm:p-6 shadow-academic space-y-5">
      
      {/* Top Header & GS Tags */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-brown-200/40 dark:border-brown-800/40">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gold-100 dark:bg-gold-950/60 text-gold-700 dark:text-gold-300">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300 border border-forest-300/40">
                {summary.gs_paper}
              </span>
              <span className="text-xs text-brown-500 dark:text-cream-400 font-sans">
                {summary.date} &bull; Editorial Summary
              </span>
            </div>
            <h3 className="font-serif font-bold text-xl text-brown-900 dark:text-cream-100 mt-0.5">
              {summary.title}
            </h3>
          </div>
        </div>

        <button
          onClick={handleCreateNote}
          className="self-start sm:self-auto py-2 px-3.5 rounded-xl bg-gold-400 hover:bg-gold-500 text-brown-950 text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Save to GS Notes</span>
        </button>
      </div>

      {/* Grid: Prelims Facts vs Mains Points */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Prelims Key Facts */}
        <div className="space-y-2.5 bg-amber-50/50 dark:bg-brown-900/30 p-4 rounded-xl border border-amber-200/50 dark:border-brown-800/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300 flex items-center gap-1.5 font-sans">
            <ListChecks className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            Prelims High-Yield Facts
          </h4>
          <ul className="space-y-2 text-xs text-brown-800 dark:text-cream-200 font-sans">
            {summary.prelims_facts.map((fact, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span>{fact}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mains Analytical Points */}
        <div className="space-y-2.5 bg-forest-50/50 dark:bg-forest-950/20 p-4 rounded-xl border border-forest-200/50 dark:border-forest-900/50">
          <h4 className="text-xs font-bold uppercase tracking-wider text-forest-900 dark:text-forest-300 flex items-center gap-1.5 font-sans">
            <FileSpreadsheet className="w-4 h-4 text-forest-600 dark:text-forest-400" />
            Mains Answer Highlights
          </h4>
          <ul className="space-y-2 text-xs text-brown-800 dark:text-cream-200 font-sans">
            {summary.mains_points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-forest-500 mt-1.5 shrink-0" />
                <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom Keywords & Vocabulary */}
      <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-brown-200/30 dark:border-brown-800/30">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-brown-400 dark:text-cream-400 font-medium font-sans">Keywords:</span>
          {summary.keywords.map((kw, i) => (
            <span key={i} className="text-[11px] px-2 py-0.5 rounded-md bg-brown-100/70 dark:bg-brown-800/60 text-brown-700 dark:text-cream-200 border border-brown-200/40">
              #{kw}
            </span>
          ))}
        </div>

        <div className="text-xs text-brown-500 dark:text-cream-300 font-serif italic">
          Source: {summary.syllabus_topic}
        </div>
      </div>

    </div>
  );
}
