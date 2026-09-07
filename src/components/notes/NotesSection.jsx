import React, { useState } from 'react';
import { FileText, Plus, Search, Trash2, Calendar, Tag, Check, Save, X } from 'lucide-react';
import { GS_CATEGORIES } from '../../data/upscSyllabus';

export default function NotesSection({ notes, onSaveNote, onDeleteNote }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGsCategory, setNewGsCategory] = useState('GS3');
  const [newSource, setNewSource] = useState('The Hindu');
  const [newContent, setNewContent] = useState('');

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    onSaveNote({
      id: `note-${Date.now()}`,
      title: newTitle,
      gs_category: newGsCategory,
      source: newSource,
      date: new Date().toISOString().split('T')[0],
      content: newContent,
      created_at: new Date().toISOString()
    });

    setNewTitle('');
    setNewContent('');
    setIsAdding(false);
  };

  const filtered = notes.filter(n => {
    const matchesCat = selectedCategory === 'ALL' || n.gs_category === selectedCategory;
    const matchesQuery = !searchQuery ||
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-brown-200/40 dark:border-brown-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-900 dark:text-cream-100 tracking-tight">
            Arshi's GS Notes Repository
          </h1>
          <p className="text-xs text-brown-500 font-sans mt-0.5">
            Organized UPSC Notes by General Studies Category
          </p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="py-2.5 px-4 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all active:scale-95 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New GS Note</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-4 shadow-academic space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-brown-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword or topic..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl bg-cream-50/80 dark:bg-brown-900/40 border border-brown-200/80 dark:border-brown-800 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
              selectedCategory === 'ALL'
                ? 'bg-brown-900 text-cream-100 dark:bg-gold-400 dark:text-brown-950 font-bold'
                : 'bg-brown-50 dark:bg-brown-900/40 text-brown-700 dark:text-cream-300'
            }`}
          >
            All Notes
          </button>
          {GS_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gold-400 text-brown-950 border-gold-500 font-bold'
                  : `${cat.color} opacity-85 hover:opacity-100`
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Add Note Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-brown-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-academic-cardDark w-full max-w-lg rounded-2xl border border-brown-200 dark:border-academic-borderDark p-5 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3 border-brown-200 dark:border-brown-800">
              <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100">
                Create GS Note
              </h3>
              <button onClick={() => setIsAdding(false)} className="text-brown-500 hover:text-brown-800">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-brown-500 uppercase block mb-1">Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Monetary Policy & Inflation"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-brown-500 uppercase block mb-1">GS Category</label>
                  <select
                    value={newGsCategory}
                    onChange={(e) => setNewGsCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
                  >
                    {GS_CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-brown-500 uppercase block mb-1">Source Paper</label>
                  <input
                    type="text"
                    value={newSource}
                    onChange={(e) => setNewSource(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-brown-500 uppercase block mb-1">Content</label>
                <textarea
                  required
                  rows={6}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Write your note bullet points..."
                  className="w-full p-3 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none font-sans leading-relaxed"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="py-2 px-4 rounded-xl bg-brown-100 dark:bg-brown-800 text-brown-800 dark:text-cream-200 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2 px-5 rounded-xl bg-brown-500 hover:bg-brown-600 text-cream-100 font-bold"
                >
                  Save Note
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(n => (
          <div key={n.id} className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-4 shadow-academic flex flex-col justify-between space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                  {n.gs_category}
                </span>
                <span className="text-[11px] text-brown-400 font-sans">{n.date}</span>
              </div>
              <h3 className="font-serif font-bold text-base text-brown-900 dark:text-cream-100 line-clamp-2">
                {n.title}
              </h3>
            </div>

            <div className="p-3 rounded-xl bg-cream-50/60 dark:bg-brown-900/30 border border-brown-200/40 dark:border-brown-800">
              <p className="text-xs text-brown-800 dark:text-cream-200 font-sans whitespace-pre-wrap line-clamp-4 leading-relaxed">
                {n.content}
              </p>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-brown-200/30 dark:border-brown-800">
              <span className="text-[11px] font-serif italic text-gold-700 dark:text-gold-400">
                Source: {n.source || 'UPSC Desk'}
              </span>
              <button
                onClick={() => onDeleteNote(n.id)}
                className="text-brown-400 hover:text-rose-600 p-1 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
