import React from 'react';
import { BookOpen, CheckCircle2, Clock, FileText, ChevronRight } from 'lucide-react';

export default function NewspaperCard({ paper, onOpenReader, onToggleComplete }) {
  const isCompleted = paper.completed;
  const progressPercent = Math.round(((paper.read_page || 0) / (paper.page_count || 1)) * 100);

  const getSourceColor = (source) => {
    switch (source) {
      case 'The Hindu':
        return 'bg-brown-900 text-gold-200 border-brown-700';
      case 'Indian Express':
        return 'bg-forest-800 text-cream-100 border-forest-700';
      case 'The Times of India':
        return 'bg-amber-900 text-amber-100 border-amber-800';
      default:
        return 'bg-brown-800 text-cream-100 border-brown-700';
    }
  };

  return (
    <div className="group relative bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark overflow-hidden shadow-academic hover:shadow-academic-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Top Banner Image with Gradient Overlay */}
      <div className="relative h-40 overflow-hidden bg-brown-100 dark:bg-brown-900/60">
        <img
          src={paper.thumbnail_url}
          alt={paper.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 dark:opacity-75"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brown-950/80 via-brown-950/30 to-transparent" />

        {/* Source Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-serif font-semibold border shadow-sm ${getSourceColor(paper.source)}`}>
          {paper.source}
        </span>

        {/* Completed Badge */}
        {isCompleted && (
          <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold bg-forest-500 text-white flex items-center gap-1 shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" /> Read
          </span>
        )}

        {/* Bottom Title on Image */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <h3 className="font-serif font-bold text-lg leading-tight line-clamp-1 group-hover:text-gold-300 transition-colors">
            {paper.title}
          </h3>
          <p className="text-xs text-cream-200/90 font-sans mt-0.5">
            {paper.date} &bull; {paper.page_count} Pages
          </p>
        </div>
      </div>

      {/* Card Content & Editorial Snippet */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
        
        {paper.editorial_highlight && (
          <div className="bg-cream-50 dark:bg-brown-900/40 p-3 rounded-xl border border-brown-200/40 dark:border-brown-800/40">
            <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 font-sans block mb-1">
              Editorial Highlight
            </span>
            <p className="text-xs text-brown-800 dark:text-cream-200 font-serif leading-relaxed line-clamp-2">
              "{paper.editorial_highlight}"
            </p>
          </div>
        )}

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-medium text-brown-700 dark:text-cream-300">
            <span>Progress ({paper.read_page || 0}/{paper.page_count} pages)</span>
            <span className="text-gold-700 dark:text-gold-400 font-bold">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-brown-100 dark:bg-brown-800 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                isCompleted ? 'bg-forest-500' : 'bg-gold-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Buttons Action Bar */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => onOpenReader(paper)}
            className="flex-1 py-2 px-3 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read PDF</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => onToggleComplete(paper.id)}
            title={isCompleted ? 'Mark as Unread' : 'Mark Today Completed'}
            className={`p-2 rounded-xl border text-xs font-medium transition-all ${
              isCompleted
                ? 'bg-forest-50 dark:bg-forest-950/40 text-forest-700 dark:text-forest-300 border-forest-300/60'
                : 'bg-cream-50 dark:bg-brown-900/60 text-brown-600 dark:text-cream-300 border-brown-200/60 hover:bg-gold-50'
            }`}
          >
            <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-forest-600' : 'text-brown-400'}`} />
          </button>
        </div>

      </div>

    </div>
  );
}
