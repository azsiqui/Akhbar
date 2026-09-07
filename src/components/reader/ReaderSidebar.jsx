import React, { useState } from 'react';
import { Bookmark, FileText, Sparkles, Trash2, Plus, ArrowRight, ExternalLink } from 'lucide-react';
import { GS_CATEGORIES } from '../../data/upscSyllabus';

export default function ReaderSidebar({
  paper,
  bookmarks = [],
  notes = [],
  summary,
  onJumpToPage,
  onDeleteBookmark,
  onOpenNotesEditor,
  onSaveQuickNote
}) {
  const [activeTab, setActiveTab] = useState('bookmarks'); // 'bookmarks' | 'notes' | 'summary'
  const [quickNoteTitle, setQuickNoteTitle] = useState('');
  const [quickNoteText, setQuickNoteText] = useState('');
  const [quickGsCategory, setQuickGsCategory] = useState('GS3');

  const handleCreateQuickNote = (e) => {
    e.preventDefault();
    if (!quickNoteText.trim()) return;
    onSaveQuickNote({
      newspaper_id: paper.id,
      title: quickNoteTitle || `Page Note - ${paper.source}`,
      content: quickNoteText,
      gs_category: quickGsCategory,
      source: paper.source,
      date: paper.date
    });
    setQuickNoteTitle('');
    setQuickNoteText('');
  };

  return (
    <div className="w-full lg:w-80 bg-cream-50 dark:bg-academic-cardDark border-l border-brown-200/60 dark:border-academic-borderDark flex flex-col h-full shrink-0 transition-colors duration-300">
      
      {/* Sidebar Header Tabs */}
      <div className="grid grid-cols-3 border-b border-brown-200/60 dark:border-brown-800 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'bookmarks'
              ? 'border-gold-400 text-brown-900 dark:text-gold-300 font-bold bg-white/60 dark:bg-brown-900/40'
              : 'border-transparent text-brown-500 dark:text-cream-400 hover:text-brown-800'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmarks ({bookmarks.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'notes'
              ? 'border-gold-400 text-brown-900 dark:text-gold-300 font-bold bg-white/60 dark:bg-brown-900/40'
              : 'border-transparent text-brown-500 dark:text-cream-400 hover:text-brown-800'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Notes ({notes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('summary')}
          className={`py-3 flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'summary'
              ? 'border-gold-400 text-brown-900 dark:text-gold-300 font-bold bg-white/60 dark:bg-brown-900/40'
              : 'border-transparent text-brown-500 dark:text-cream-400 hover:text-brown-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-500" />
          <span>GS Summary</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        
        {/* BOOKMARKS TAB */}
        {activeTab === 'bookmarks' && (
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-brown-400 dark:text-cream-400 uppercase tracking-wider font-sans">
              Saved Pages for {paper.source}
            </h4>

            {bookmarks.length === 0 ? (
              <div className="text-center py-8 text-xs text-brown-500 dark:text-cream-400 font-serif italic space-y-1">
                <Bookmark className="w-6 h-6 mx-auto text-brown-300 dark:text-brown-700" />
                <p>No bookmarks saved yet for this newspaper.</p>
                <p className="text-[11px] font-sans text-gold-700 dark:text-gold-400">
                  Use the toolbar to bookmark important pages!
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {bookmarks.map((bm) => (
                  <div
                    key={bm.id}
                    className="p-3 rounded-xl bg-white dark:bg-brown-900/50 border border-brown-200/50 dark:border-brown-800 space-y-1.5 shadow-sm group hover:border-gold-400 transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => onJumpToPage(bm.page)}
                        className="font-serif font-bold text-xs text-brown-900 dark:text-gold-200 hover:underline text-left flex items-center gap-1.5"
                      >
                        <span className="px-1.5 py-0.5 rounded bg-gold-100 dark:bg-gold-950 text-gold-900 dark:text-gold-300 font-sans text-[10px]">
                          Page {bm.page}
                        </span>
                        <span>{bm.title}</span>
                      </button>

                      <button
                        onClick={() => onDeleteBookmark(bm.id)}
                        className="opacity-0 group-hover:opacity-100 text-brown-400 hover:text-rose-600 transition-opacity p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {bm.note && (
                      <p className="text-[11px] text-brown-600 dark:text-cream-300 italic font-serif">
                        "{bm.note}"
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* NOTES TAB */}
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {/* Quick Note Form */}
            <form onSubmit={handleCreateQuickNote} className="space-y-2 p-3 bg-white dark:bg-brown-900/50 rounded-xl border border-brown-200/50 dark:border-brown-800 shadow-sm">
              <h5 className="text-xs font-bold text-brown-900 dark:text-cream-100 font-serif">
                Quick GS Note
              </h5>
              
              <input
                type="text"
                placeholder="Note Title (e.g. MSP Policy)"
                value={quickNoteTitle}
                onChange={(e) => setQuickNoteTitle(e.target.value)}
                className="w-full px-2.5 py-1 text-xs rounded-lg bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
              />

              <div className="flex items-center gap-1.5">
                <select
                  value={quickGsCategory}
                  onChange={(e) => setQuickGsCategory(e.target.value)}
                  className="px-2 py-1 text-[11px] font-semibold rounded-lg bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
                >
                  {GS_CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.label}</option>
                  ))}
                </select>
                <span className="text-[10px] text-brown-400">GS Tag</span>
              </div>

              <textarea
                placeholder="Write bullet points or key facts..."
                rows={3}
                value={quickNoteText}
                onChange={(e) => setQuickNoteText(e.target.value)}
                className="w-full p-2 text-xs rounded-lg bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
              />

              <button
                type="submit"
                className="w-full py-1.5 px-3 rounded-lg bg-forest-500 hover:bg-forest-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Save Quick Note</span>
              </button>
            </form>

            {/* List Existing Notes */}
            <div className="space-y-2">
              {notes.map(note => (
                <div key={note.id} className="p-3 rounded-xl bg-white dark:bg-brown-900/50 border border-brown-200/50 dark:border-brown-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                      {note.gs_category}
                    </span>
                    <span className="text-[10px] text-brown-400">{note.date}</span>
                  </div>
                  <h5 className="font-serif font-bold text-xs text-brown-900 dark:text-cream-100">
                    {note.title}
                  </h5>
                  <p className="text-[11px] text-brown-600 dark:text-cream-300 line-clamp-3 font-sans leading-relaxed">
                    {note.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUMMARY TAB */}
        {activeTab === 'summary' && summary && (
          <div className="space-y-3">
            <div className="p-3 rounded-xl bg-gold-50 dark:bg-gold-950/40 border border-gold-300/50 space-y-1">
              <span className="text-[10px] font-bold text-gold-800 dark:text-gold-300 uppercase">
                {summary.gs_paper} Editorial Breakdown
              </span>
              <h5 className="font-serif font-bold text-xs text-brown-900 dark:text-cream-100">
                {summary.lead_editorial}
              </h5>
            </div>

            <div className="space-y-1.5">
              <h6 className="text-[11px] font-bold text-brown-700 dark:text-cream-300 uppercase font-sans">
                Prelims Facts
              </h6>
              <ul className="space-y-1 text-xs text-brown-800 dark:text-cream-200">
                {summary.prelims_facts.slice(0, 3).map((fact, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-tight text-[11px]">
                    <span className="text-gold-500 font-bold">•</span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-1.5 pt-2 border-t border-brown-200/40 dark:border-brown-800/40">
              <h6 className="text-[11px] font-bold text-brown-700 dark:text-cream-300 uppercase font-sans">
                Mains Points
              </h6>
              <ul className="space-y-1 text-xs text-brown-800 dark:text-cream-200">
                {summary.mains_points.slice(0, 2).map((point, i) => (
                  <li key={i} className="flex items-start gap-1.5 leading-tight text-[11px]">
                    <span className="text-forest-500 font-bold">•</span>
                    <span dangerouslySetInnerHTML={{ __html: point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
