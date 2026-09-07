import React, { useRef } from 'react';
import { BookOpen, Upload, CheckCircle2, Calendar, FileQuestion } from 'lucide-react';

export default function BrandNewspaperCard({ paper, onOpenReader, onUploadPaper, onToggleComplete }) {
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobUrl = URL.createObjectURL(file);
      const todayDate = new Date().toISOString().split('T')[0];

      // Auto-assign title = brandName, date = upload date (today)
      const updated = {
        ...paper,
        date: todayDate,
        title: paper.brandName,
        pdfUrl: blobUrl,
        readPage: 1,
        completed: false,
        editorialSnippet: `Today's edition uploaded on ${todayDate}.`
      };

      onUploadPaper(updated);
    }
  };

  const isCompleted = paper?.completed || false;
  const hasPdf = Boolean(paper?.pdfUrl);
  const progressPercent = Math.round(((paper?.readPage || 0) / (paper?.pageCount || 14)) * 100);

  return (
    <div className="group relative bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark overflow-hidden shadow-academic hover:shadow-academic-lg transition-all duration-300 flex flex-col justify-between">
      
      {/* Brand Header Banner */}
      <div className={`p-4 bg-gradient-to-r ${paper.headerBg} text-white relative overflow-hidden`}>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex items-center justify-between">
          <span className={`text-[11px] font-serif font-bold px-2.5 py-0.5 rounded-full border ${paper.badgeColor}`}>
            {paper.brandName}
          </span>

          <div className="flex items-center gap-1 text-xs text-cream-200 font-sans">
            <Calendar className="w-3.5 h-3.5" />
            <span>{paper.date}</span>
          </div>
        </div>

        <h3 className="font-serif font-bold text-xl sm:text-2xl mt-2 tracking-tight">
          {paper.brandName}
        </h3>
        <p className="text-xs text-cream-200/80 font-sans mt-0.5">
          {paper.tagline}
        </p>
      </div>

      {/* Main Body */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        
        {/* Status Callout / Editorial Snippet */}
        <div className="p-3 rounded-xl bg-cream-50 dark:bg-brown-900/40 border border-brown-200/40 dark:border-brown-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gold-700 dark:text-gold-400 font-sans block mb-1">
            {hasPdf ? `Edition Status \u2022 ${paper.date}` : 'Awaiting Upload'}
          </span>
          <p className="text-xs text-brown-800 dark:text-cream-200 font-serif leading-relaxed line-clamp-2">
            {hasPdf
              ? `"${paper.editorialSnippet || 'Ready for reading.'}"`
              : 'No PDF uploaded for today yet. Click "Upload PDF" below to add today\'s paper!'}
          </p>
        </div>

        {/* Reading Progress */}
        {hasPdf && (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs font-medium text-brown-700 dark:text-cream-300">
              <span>Reading Progress ({paper.readPage || 0}/{paper.pageCount || 14} pages)</span>
              <span className="text-gold-700 dark:text-gold-400 font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-brown-100 dark:bg-brown-800 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${isCompleted ? 'bg-forest-500' : 'bg-gold-400'}`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-2 pt-1">
          
          {/* Read PDF Button */}
          <button
            onClick={() => hasPdf && onOpenReader(paper)}
            disabled={!hasPdf}
            title={hasPdf ? 'Open PDF Reader' : 'Please upload PDF first'}
            className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all ${
              hasPdf
                ? 'bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 active:scale-95'
                : 'bg-brown-100 dark:bg-brown-900 text-brown-400 dark:text-cream-400 opacity-60 cursor-not-allowed'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>{hasPdf ? 'Read PDF' : 'No PDF Yet'}</span>
          </button>

          {/* Direct 1-Click Upload Button */}
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Upload today's PDF for this paper (Auto-assigns title & date)"
            className="py-2.5 px-3 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-forest-950/40 dark:hover:bg-forest-900/40 text-forest-800 dark:text-forest-300 border border-forest-300/60 text-xs font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95"
          >
            <Upload className="w-4 h-4" />
            <span>{hasPdf ? 'Replace PDF' : 'Upload PDF'}</span>
          </button>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
          />

        </div>

      </div>

    </div>
  );
}
