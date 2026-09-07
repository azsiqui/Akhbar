import React, { useState, useEffect } from 'react';
import { Save, X, Eye, Edit2, Sparkles, BookOpen, Check, FileText } from 'lucide-react';
import { GS_CATEGORIES } from '../../data/upscSyllabus';

export default function NotesEditor({ initialNote, onSave, onClose }) {
  const [title, setTitle] = useState(initialNote?.title || '');
  const [gsCategory, setGsCategory] = useState(initialNote?.gs_category || 'GS3');
  const [source, setSource] = useState(initialNote?.source || 'The Hindu');
  const [date, setDate] = useState(initialNote?.date || new Date().toISOString().split('T')[0]);
  const [content, setContent] = useState(initialNote?.content || '');
  const [isPreview, setIsPreview] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (initialNote) {
      setTitle(initialNote.title || '');
      setGsCategory(initialNote.gs_category || 'GS3');
      setSource(initialNote.source || 'The Hindu');
      setDate(initialNote.date || new Date().toISOString().split('T')[0]);
      setContent(initialNote.content || '');
    }
  }, [initialNote]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onSave({
      ...initialNote,
      id: initialNote?.id || `note-${Date.now()}`,
      title,
      gs_category: gsCategory,
      source,
      date,
      content,
      created_at: initialNote?.created_at || new Date().toISOString()
    });

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  // Quick UPSC Templates
  const applyTemplate = (type) => {
    if (type === 'mains') {
      setContent(`## GS Paper ${gsCategory.replace('GS', '')}: Mains Answer Outline

### 1. Introduction (Context / Definition)
* Briefly define the core theme in 20-30 words.

### 2. Key Issues & Challenges
* **Issue 1**: Economic / Policy bottleneck.
* **Issue 2**: Institutional / Governance deficit.

### 3. Way Forward & Recommendations
1. Modernize infrastructure and regulatory framework.
2. Adopt best practices & NITI Aayog recommendations.

> **Conclusion**: Wrap up with an optimistic forward-looking statement.`);
    } else if (type === 'prelims') {
      setContent(`## Prelims High-Yield Facts (${date})

* **Statutory Body / Act**: Key provisions & ministry under which it operates.
* **Reports & Indices**: Published by (e.g. World Bank / NITI Aayog), India's rank.
* **Species / Conservation**: IUCN Status, Habitat, Protected Areas.
* **Map / Geo location**: Nearby rivers, mountain passes, bordering states.`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-brown-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-academic-cardDark w-full max-w-4xl max-h-[90vh] rounded-2xl border border-brown-200/80 dark:border-academic-borderDark shadow-academic-lg flex flex-col overflow-hidden transition-all duration-300">
        
        {/* Top Header */}
        <div className="p-4 sm:p-5 border-b border-brown-200/60 dark:border-academic-borderDark flex items-center justify-between bg-cream-50/80 dark:bg-brown-900/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100">
                {initialNote ? 'Edit GS Note' : 'Create New GS Note'}
              </h3>
              <p className="text-xs text-brown-500 dark:text-cream-400 font-sans">
                Markdown Editor for Arshi's UPSC Desk
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsPreview(!isPreview)}
              className="py-1.5 px-3 rounded-xl bg-brown-100 dark:bg-brown-800 text-brown-800 dark:text-cream-200 text-xs font-semibold flex items-center gap-1.5 hover:bg-gold-100 transition-all"
            >
              {isPreview ? <Edit2 className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{isPreview ? 'Edit Mode' : 'Preview Mode'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-500 dark:text-cream-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
          
          {/* Metadata Bar */}
          <div className="p-4 bg-white dark:bg-academic-cardDark border-b border-brown-200/40 dark:border-brown-800/40 grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <label className="text-[11px] font-bold uppercase text-brown-500 dark:text-cream-400 font-sans block mb-1">
                Note Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Monetary Policy & Food Inflation"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-brown-500 dark:text-cream-400 font-sans block mb-1">
                GS Category
              </label>
              <select
                value={gsCategory}
                onChange={(e) => setGsCategory(e.target.value)}
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
              >
                {GS_CATEGORIES.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase text-brown-500 dark:text-cream-400 font-sans block mb-1">
                Source Paper
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                placeholder="The Hindu / IE"
                className="w-full px-3 py-1.5 text-xs sm:text-sm rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
              />
            </div>
          </div>

          {/* UPSC Template Helper Buttons */}
          <div className="px-4 py-2 bg-cream-50/60 dark:bg-brown-900/20 border-b border-brown-200/40 dark:border-brown-800/40 flex flex-wrap items-center justify-between gap-2 text-xs">
            <span className="text-brown-500 dark:text-cream-400 font-sans text-[11px]">
              Quick Answer Templates:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => applyTemplate('mains')}
                className="py-1 px-2.5 rounded-lg bg-gold-100 dark:bg-gold-950 text-gold-900 dark:text-gold-300 border border-gold-300/40 text-[11px] font-medium hover:bg-gold-200"
              >
                + Mains Answer Template
              </button>
              <button
                type="button"
                onClick={() => applyTemplate('prelims')}
                className="py-1 px-2.5 rounded-lg bg-forest-100 dark:bg-forest-950 text-forest-900 dark:text-forest-300 border border-forest-300/40 text-[11px] font-medium hover:bg-forest-200"
              >
                + Prelims Fact Sheet
              </button>
            </div>
          </div>

          {/* Main Textarea vs Preview */}
          <div className="flex-1 p-4 overflow-y-auto bg-white dark:bg-academic-cardDark">
            {!isPreview ? (
              <textarea
                required
                rows={12}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your note in Markdown format..."
                className="w-full h-full p-4 text-xs sm:text-sm font-sans rounded-xl bg-cream-50/50 dark:bg-brown-900/30 border border-brown-200/60 dark:border-brown-800 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-2 focus:ring-gold-400/50 leading-relaxed"
              />
            ) : (
              <div className="p-4 rounded-xl bg-cream-50/60 dark:bg-brown-900/30 border border-brown-200/40 dark:border-brown-800/40 space-y-4 font-sans text-xs sm:text-sm text-brown-900 dark:text-cream-100 leading-relaxed whitespace-pre-wrap">
                <h2 className="font-serif font-bold text-xl border-b pb-2 border-brown-200 dark:border-brown-800">
                  {title || 'Untitled Note'}
                </h2>
                <div className="text-xs font-semibold text-gold-700 dark:text-gold-400 font-serif italic">
                  {gsCategory} &bull; {source} &bull; {date}
                </div>
                <div className="pt-2">{content}</div>
              </div>
            )}
          </div>

          {/* Footer Actions */}
          <div className="p-4 bg-cream-50/80 dark:bg-brown-900/40 border-t border-brown-200/60 dark:border-academic-borderDark flex items-center justify-between">
            <span className="text-xs text-brown-500 dark:text-cream-400 font-sans">
              Autosaves to local storage & Supabase
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="py-2 px-4 rounded-xl bg-brown-100 dark:bg-brown-800 text-brown-800 dark:text-cream-200 text-xs font-semibold hover:bg-brown-200 transition-all"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="py-2 px-5 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
              >
                {savedSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-forest-300" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Note</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
