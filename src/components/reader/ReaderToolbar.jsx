import React from 'react';
import { ZoomIn, ZoomOut, RotateCw, Maximize2, Bookmark, FilePlus, Eye, ArrowLeft, ArrowRight } from 'lucide-react';

export default function ReaderToolbar({
  currentPage,
  totalPages,
  zoom,
  onZoomIn,
  onZoomOut,
  onRotate,
  onPageChange,
  onAddBookmark,
  onAddQuickNote,
  onToggleSidebar,
  sidebarOpen
}) {
  return (
    <div className="bg-white dark:bg-academic-cardDark border-b border-brown-200/60 dark:border-academic-borderDark px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs font-sans shadow-sm sticky top-0 z-20">
      
      {/* Page Navigation */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          className="p-1.5 rounded-lg bg-brown-50 dark:bg-brown-900/60 hover:bg-brown-100 disabled:opacity-40 text-brown-800 dark:text-cream-200 border border-brown-200/50"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-1">
          <span className="text-brown-600 dark:text-cream-400">Page</span>
          <input
            type="number"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (val >= 1 && val <= totalPages) onPageChange(val);
            }}
            className="w-12 text-center py-0.5 font-semibold rounded bg-brown-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
          />
          <span className="text-brown-600 dark:text-cream-400">of {totalPages}</span>
        </div>

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="p-1.5 rounded-lg bg-brown-50 dark:bg-brown-900/60 hover:bg-brown-100 disabled:opacity-40 text-brown-800 dark:text-cream-200 border border-brown-200/50"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="flex items-center gap-2 bg-cream-50 dark:bg-brown-900/40 p-1 rounded-xl border border-brown-200/40 dark:border-brown-800/40">
        <button
          onClick={onZoomOut}
          title="Zoom Out"
          className="p-1.5 rounded-lg hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-300"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <span className="font-mono text-[11px] font-semibold text-brown-800 dark:text-cream-200 px-1">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={onZoomIn}
          title="Zoom In"
          className="p-1.5 rounded-lg hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-300"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={onRotate}
          title="Rotate Page"
          className="p-1.5 rounded-lg hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-300 border-l border-brown-200 dark:border-brown-700 ml-1"
        >
          <RotateCw className="w-4 h-4" />
        </button>
      </div>

      {/* Quick Action Tools */}
      <div className="flex items-center gap-2">
        <button
          onClick={onAddBookmark}
          title="Bookmark current page"
          className="py-1.5 px-2.5 rounded-xl bg-gold-100 dark:bg-gold-950/60 hover:bg-gold-200 text-gold-900 dark:text-gold-300 border border-gold-300/60 font-medium flex items-center gap-1.5 transition-all"
        >
          <Bookmark className="w-3.5 h-3.5" />
          <span>Bookmark Page {currentPage}</span>
        </button>

        <button
          onClick={onAddQuickNote}
          title="Create GS Note for this page"
          className="py-1.5 px-2.5 rounded-xl bg-brown-500 hover:bg-brown-600 text-cream-100 font-medium flex items-center gap-1.5 transition-all"
        >
          <FilePlus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Note</span>
        </button>

        <button
          onClick={onToggleSidebar}
          className={`py-1.5 px-3 rounded-xl border font-medium flex items-center gap-1.5 transition-all ${
            sidebarOpen
              ? 'bg-brown-900 text-cream-100 border-brown-800'
              : 'bg-white dark:bg-brown-900/60 text-brown-800 dark:text-cream-200 border-brown-200/60 hover:bg-brown-50'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{sidebarOpen ? 'Hide Notes' : 'Notes Sidebar'}</span>
        </button>
      </div>

    </div>
  );
}
