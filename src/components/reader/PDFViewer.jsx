import React, { useState } from 'react';
import { BookOpen, FileText, AlertCircle, RefreshCw, ZoomIn, ExternalLink } from 'lucide-react';

export default function PDFViewer({
  paper,
  currentPage,
  zoom,
  rotation,
  onPageChange
}) {
  const [loadError, setLoadError] = useState(false);

  if (!paper) return null;

  return (
    <div className="flex-1 bg-brown-100/60 dark:bg-academic-paperDark/80 relative flex flex-col items-center justify-start p-4 sm:p-6 overflow-auto h-full min-h-[500px]">
      
      {/* Newspaper Header Overlay */}
      <div className="w-full max-w-4xl mb-4 bg-white/80 dark:bg-academic-cardDark/80 p-3 px-4 rounded-xl border border-brown-200/50 dark:border-brown-800 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2.5">
          <span className="w-3 h-3 rounded-full bg-forest-500 animate-pulse" />
          <h2 className="font-serif font-bold text-sm text-brown-900 dark:text-cream-100">
            {paper.title} ({paper.source}) &bull; {paper.date}
          </h2>
        </div>

        <a
          href={paper.pdf_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-gold-700 dark:text-gold-400 hover:underline flex items-center gap-1"
        >
          <span>Open Direct PDF</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* PDF Viewport Canvas Container */}
      <div
        className="w-full max-w-4xl bg-white dark:bg-brown-950 rounded-xl shadow-academic-lg border border-brown-200/80 dark:border-academic-borderDark overflow-hidden transition-all duration-300 relative flex-1 min-h-[650px] flex flex-col"
        style={{
          transform: `scale(${zoom}) rotate(${rotation}deg)`,
          transformOrigin: 'top center'
        }}
      >
        {!loadError ? (
          <iframe
            src={`${paper.pdf_url}#page=${currentPage}`}
            title={paper.title}
            onError={() => setLoadError(true)}
            className="w-full flex-1 border-0 min-h-[650px]"
          />
        ) : (
          /* Fallback Dark Academia Reading View when iframe is blocked by CORS */
          <div className="p-8 sm:p-12 space-y-6 flex-1 bg-cream-50 dark:bg-academic-paperDark text-brown-900 dark:text-cream-100 overflow-y-auto">
            
            <div className="border-b-2 border-brown-900 dark:border-gold-400 pb-4 text-center space-y-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-700 dark:text-gold-400 font-sans">
                {paper.source} &bull; National Edition
              </span>
              <h1 className="font-serif font-bold text-2xl sm:text-3xl tracking-tight">
                {paper.title}
              </h1>
              <p className="text-xs italic font-serif text-brown-600 dark:text-cream-300">
                Page {currentPage} of {paper.page_count} &bull; {paper.date}
              </p>
            </div>

            {/* Editorial Lead Article Container */}
            <div className="space-y-4 max-w-2xl mx-auto font-serif leading-relaxed">
              <h2 className="text-xl font-bold text-brown-900 dark:text-gold-200">
                Lead Article & Editorial Focus (Page {currentPage})
              </h2>

              <p className="text-sm text-brown-800 dark:text-cream-200">
                "{paper.editorial_highlight}"
              </p>

              <div className="p-4 rounded-xl bg-brown-50 dark:bg-brown-900/50 border border-brown-200 dark:border-brown-800 font-sans text-xs space-y-2">
                <div className="font-bold text-brown-900 dark:text-gold-300 uppercase">
                  UPSC Note for Page {currentPage}:
                </div>
                <p className="text-brown-700 dark:text-cream-300">
                  This section highlights critical policy developments for GS-2 (Governance) & GS-3 (Economy/Environment). Ensure you extract key facts for Prelims and analytical arguments for Mains answers.
                </p>
              </div>

              <div className="pt-4 flex justify-between text-xs font-sans text-brown-500">
                <button
                  onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage <= 1}
                  className="hover:underline text-gold-700"
                >
                  &larr; Previous Page
                </button>
                <span>Page {currentPage} of {paper.page_count}</span>
                <button
                  onClick={() => onPageChange(Math.min(paper.page_count, currentPage + 1))}
                  disabled={currentPage >= paper.page_count}
                  className="hover:underline text-gold-700"
                >
                  Next Page &rarr;
                </button>
              </div>
            </div>

          </div>
        )}
      </div>

    </div>
  );
}
