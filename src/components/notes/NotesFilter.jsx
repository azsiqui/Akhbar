import React from 'react';
import { Search, Plus, Filter } from 'lucide-react';
import { GS_CATEGORIES } from '../../data/upscSyllabus';

export default function NotesFilter({
  searchQuery,
  onSearchChange,
  selectedGsCategory,
  onGsCategoryChange,
  selectedSource,
  onSourceChange,
  onOpenNewNote
}) {
  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-4 sm:p-5 shadow-academic space-y-4">
      
      {/* Top Bar: Search & New Note Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400 dark:text-cream-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search notes by keyword, topic, or source..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-cream-50/80 dark:bg-brown-900/40 text-brown-900 dark:text-cream-100 border border-brown-200/80 dark:border-brown-800 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-gold-400/50"
          />
        </div>

        <button
          onClick={onOpenNewNote}
          className="py-2 px-4 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>New GS Note</span>
        </button>
      </div>

      {/* GS Category Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onGsCategoryChange('ALL')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
            selectedGsCategory === 'ALL'
              ? 'bg-brown-900 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-sm'
              : 'bg-brown-50 dark:bg-brown-900/40 text-brown-700 dark:text-cream-300 hover:bg-brown-100'
          }`}
        >
          All Notes
        </button>

        {GS_CATEGORIES.map(cat => (
          <button
            key={cat.id}
            onClick={() => onGsCategoryChange(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
              selectedGsCategory === cat.id
                ? 'bg-gold-400 text-brown-950 border-gold-500 shadow-sm font-bold'
                : `${cat.color} opacity-85 hover:opacity-100`
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

    </div>
  );
}
