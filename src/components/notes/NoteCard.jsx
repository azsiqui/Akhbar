import React from 'react';
import { FileText, Calendar, Edit3, Trash2, Tag, Copy, Check } from 'lucide-react';
import { GS_CATEGORIES } from '../../data/upscSyllabus';

export default function NoteCard({ note, onEdit, onDelete }) {
  const [copied, setCopied] = React.useState(false);

  const categoryObj = GS_CATEGORIES.find(c => c.id === note.gs_category) || {
    label: note.gs_category,
    color: 'bg-brown-100 text-brown-900 border-brown-300'
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`# ${note.title}\n\nGS Category: ${note.gs_category}\nSource: ${note.source || 'UPSC Prep'}\nDate: ${note.date}\n\n${note.content}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-5 shadow-academic hover:shadow-academic-lg transition-all duration-300 flex flex-col justify-between space-y-4">
      
      {/* Note Header & Badges */}
      <div className="space-y-2">
        <div className="flex items-center justify-between gap-2">
          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-md border ${categoryObj.color}`}>
            {categoryObj.label}
          </span>
          
          <div className="flex items-center gap-1.5 text-xs text-brown-500 dark:text-cream-400 font-sans">
            <Calendar className="w-3.5 h-3.5" />
            <span>{note.date}</span>
          </div>
        </div>

        <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100 line-clamp-2 leading-snug">
          {note.title}
        </h3>

        {note.source && (
          <p className="text-xs text-gold-700 dark:text-gold-400 font-serif italic">
            Source: {note.source}
          </p>
        )}
      </div>

      {/* Content Preview */}
      <div className="bg-cream-50/60 dark:bg-brown-900/30 p-3.5 rounded-xl border border-brown-200/40 dark:border-brown-800/40">
        <p className="text-xs text-brown-800 dark:text-cream-200 font-sans whitespace-pre-wrap line-clamp-4 leading-relaxed">
          {note.content}
        </p>
      </div>

      {/* Action Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-brown-200/30 dark:border-brown-800/30">
        <button
          onClick={handleCopy}
          className="text-xs font-medium text-brown-600 dark:text-cream-300 hover:text-brown-900 flex items-center gap-1"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-forest-600" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg bg-brown-50 dark:bg-brown-900/60 hover:bg-gold-50 text-brown-700 dark:text-cream-200 border border-brown-200/50 text-xs font-medium flex items-center gap-1 transition-all"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit</span>
          </button>

          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 text-rose-700 dark:text-rose-300 border border-rose-200/50 text-xs font-medium transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

    </div>
  );
}
