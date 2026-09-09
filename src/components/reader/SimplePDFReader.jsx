import React, { useState } from 'react';
import { ArrowLeft, ZoomIn, ZoomOut, RotateCw, BookOpen, FileText, Save, Check, Play, Pause, Timer } from 'lucide-react';

export default function SimplePDFReader({
  paper,
  onBack,
  onSaveNote,
  timerTimeLeft,
  timerIsRunning,
  onToggleTimer,
  onResetTimer
}) {
  const [currentPage, setCurrentPage] = useState(paper?.readPage || 1);
  const [zoom, setZoom] = useState(1.0);
  const [quickNote, setQuickNote] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const totalPages = paper?.pageCount || 14;

  const mins = timerTimeLeft !== undefined ? Math.floor(timerTimeLeft / 60) : 25;
  const secs = timerTimeLeft !== undefined ? timerTimeLeft % 60 : 0;
  const timerStr = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  const handleSaveQuickNote = () => {
    if (!quickNote.trim()) return;
    onSaveNote({
      id: `note-${Date.now()}`,
      title: `${paper.brandName} - Page ${currentPage} Notes`,
      gs_category: 'GS3',
      source: paper.brandName,
      date: paper.date,
      content: quickNote
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark overflow-hidden shadow-academic">
      
      {/* Top Toolbar */}
      <div className="bg-cream-50 dark:bg-brown-900/60 border-b border-brown-200/60 dark:border-brown-800 p-3 px-4 flex flex-wrap items-center justify-between gap-3 text-xs font-sans">
        
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="py-1.5 px-3 rounded-xl bg-brown-500 text-cream-100 hover:bg-brown-600 font-semibold flex items-center gap-1.5 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Dashboard</span>
          </button>

          <h2 className="font-serif font-bold text-sm text-brown-900 dark:text-cream-100">
            {paper.brandName} &bull; {paper.date}
          </h2>
        </div>

        {/* Persistent Mini Pomodoro Timer in PDF Reader Bar */}
        {timerTimeLeft !== undefined && (
          <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-brown-900 rounded-xl border border-brown-200 dark:border-brown-700 shadow-2xs">
            <Timer className={`w-3.5 h-3.5 ${timerIsRunning ? 'text-gold-500 animate-pulse' : 'text-brown-500 dark:text-cream-400'}`} />
            <span className="font-mono font-bold text-brown-900 dark:text-gold-200">
              {timerStr}
            </span>
            <button
              onClick={onToggleTimer}
              className="p-1 rounded-lg bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 font-bold"
              title={timerIsRunning ? 'Pause Timer' : 'Start Timer'}
            >
              {timerIsRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
            </button>
          </div>
        )}

        {/* Page controls & Zoom */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-white dark:bg-brown-900 p-1 rounded-xl border border-brown-200 dark:border-brown-700">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage <= 1}
              className="px-2 py-0.5 rounded hover:bg-brown-100 disabled:opacity-40"
            >
              &larr;
            </button>
            <span className="font-semibold text-brown-800 dark:text-cream-200 px-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage >= totalPages}
              className="px-2 py-0.5 rounded hover:bg-brown-100 disabled:opacity-40"
            >
              &rarr;
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoom(Math.max(0.7, zoom - 0.15))}
              className="p-1.5 rounded-lg bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-700 dark:text-cream-300"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="font-mono font-bold text-[11px] px-1">{Math.round(zoom * 100)}%</span>
            <button
              onClick={() => setZoom(Math.min(2.0, zoom + 0.15))}
              className="p-1.5 rounded-lg bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-700 dark:text-cream-300"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Reader Body + Quick Note Sidebar */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* PDF Frame */}
        <div className="flex-1 bg-brown-100/50 dark:bg-academic-paperDark p-4 overflow-auto flex justify-center">
          <div
            className="w-full max-w-4xl bg-white dark:bg-brown-950 rounded-xl shadow-lg border border-brown-200 dark:border-brown-800 overflow-hidden flex flex-col transition-transform"
            style={{ transform: `scale(${zoom})`, transformOrigin: 'top center' }}
          >
            <iframe
              src={`${paper.pdfUrl}#page=${currentPage}`}
              title={paper.brandName}
              className="w-full h-full min-h-[650px] border-0"
            />
          </div>
        </div>

        {/* Quick Note Pad */}
        <div className="w-80 bg-cream-50 dark:bg-brown-900/40 border-l border-brown-200/60 dark:border-brown-800 p-4 space-y-3 flex flex-col justify-between shrink-0">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-sm text-brown-900 dark:text-cream-100 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-gold-600" />
              Quick Notes for Page {currentPage}
            </h3>
            <textarea
              rows={8}
              value={quickNote}
              onChange={(e) => setQuickNote(e.target.value)}
              placeholder="Write UPSC bullet points or key facts from this page..."
              className="w-full p-3 text-xs rounded-xl bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400 font-sans leading-relaxed"
            />
          </div>

          <button
            onClick={handleSaveQuickNote}
            className="w-full py-2 px-3 rounded-xl bg-forest-500 hover:bg-forest-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-xs"
          >
            {savedSuccess ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{savedSuccess ? 'Saved to Notes!' : 'Save Note'}</span>
          </button>
        </div>

      </div>

    </div>
  );
}
