import React, { useState } from 'react';
import { X, Upload, FileText, CheckCircle2, Link as LinkIcon, Sparkles } from 'lucide-react';

export default function UploadModal({ onSaveNewspaper, onClose }) {
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('The Hindu');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [pdfUrl, setPdfUrl] = useState('');
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [pageCount, setPageCount] = useState(14);
  const [editorialHighlight, setEditorialHighlight] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUploading(true);

    const defaultThumbs = {
      'The Hindu': 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=600&q=80',
      'Indian Express': 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=600&q=80',
      'The Times of India': 'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=600&q=80'
    };

    const newPaper = {
      id: `np-${source.toLowerCase().replace(/\s+/g, '')}-${Date.now()}`,
      date,
      title: title || `${source} - National Edition`,
      source,
      pdf_url: pdfUrl || 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/web/compressed.tracemonkey-pldi-09.pdf',
      thumbnail_url: thumbnailUrl || defaultThumbs[source] || defaultThumbs['The Hindu'],
      page_count: parseInt(pageCount) || 14,
      read_page: 0,
      completed: false,
      editorial_highlight: editorialHighlight || 'Daily National & Editorial Breakdown for UPSC Civil Services'
    };

    setTimeout(() => {
      onSaveNewspaper(newPaper);
      setIsUploading(false);
      onClose();
    }, 600);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      setPdfUrl(blobUrl);
      if (!title) setTitle(file.name.replace('.pdf', ''));
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-brown-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-academic-cardDark w-full max-w-lg rounded-2xl border border-brown-200/80 dark:border-academic-borderDark shadow-academic-lg overflow-hidden transition-all">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-brown-200/60 dark:border-academic-borderDark flex items-center justify-between bg-cream-50/80 dark:bg-brown-900/40">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-forest-500 text-white">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100">
                Upload Today's Newspaper
              </h3>
              <p className="text-xs text-brown-500 dark:text-cream-400 font-sans">
                Add PDF for Arshi's Reading Desk
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-500 dark:text-cream-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs font-sans">
          
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold uppercase text-brown-500 dark:text-cream-400 block mb-1">
                Newspaper Source
              </label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 font-semibold focus:outline-none"
              >
                <option value="The Hindu">The Hindu</option>
                <option value="Indian Express">Indian Express</option>
                <option value="The Times of India">The Times of India</option>
                <option value="PIB Editorial">PIB Editorial</option>
              </select>
            </div>

            <div>
              <label className="font-bold uppercase text-brown-500 dark:text-cream-400 block mb-1">
                Edition Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold uppercase text-brown-500 dark:text-cream-400 block mb-1">
              Title / Edition Name
            </label>
            <input
              type="text"
              placeholder="e.g. The Hindu - Delhi Edition"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
            />
          </div>

          {/* Drag & Drop File or URL */}
          <div className="space-y-2">
            <label className="font-bold uppercase text-brown-500 dark:text-cream-400 block">
              PDF Upload or Direct URL
            </label>

            <div className="p-4 rounded-xl bg-cream-50/60 dark:bg-brown-900/30 border-2 border-dashed border-brown-300 dark:border-brown-700 text-center space-y-2">
              <Upload className="w-6 h-6 mx-auto text-brown-400 dark:text-gold-400" />
              <div className="text-xs text-brown-700 dark:text-cream-200 font-medium">
                Choose a PDF file from your device
              </div>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                className="text-xs text-brown-500 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-gold-100 file:text-gold-900 hover:file:bg-gold-200"
              />
            </div>

            <div className="flex items-center gap-2 pt-1">
              <span className="text-[10px] text-brown-400 uppercase font-bold">Or URL:</span>
              <input
                type="url"
                placeholder="https://example.com/newspaper.pdf"
                value={pdfUrl}
                onChange={(e) => setPdfUrl(e.target.value)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="font-bold uppercase text-brown-500 dark:text-cream-400 block mb-1">
              Editorial Highlight Note (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Monetary Policy & Food Inflation analysis"
              value={editorialHighlight}
              onChange={(e) => setEditorialHighlight(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-brown-200/40 dark:border-brown-800/40 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 rounded-xl bg-brown-100 dark:bg-brown-800 text-brown-800 dark:text-cream-200 font-semibold hover:bg-brown-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="py-2 px-5 rounded-xl bg-forest-500 hover:bg-forest-600 text-white font-bold flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              {isUploading ? (
                <span>Adding Paper...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save to Akhbar</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
