import React, { useState } from 'react';
import { Megaphone, X, Send, Sparkles, Clock, Edit3 } from 'lucide-react';

export default function AnnouncementModal({
  isOpen,
  onClose,
  announcement,
  onPublish
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedNotice, setPublishedNotice] = useState(false);

  if (!isOpen) return null;

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    setIsPublishing(true);
    await onPublish(newMessageText.trim());
    setIsPublishing(false);
    setPublishedNotice(true);
    setIsEditing(false);
    setNewMessageText('');

    setTimeout(() => {
      setPublishedNotice(false);
    }, 3000);
  };

  const formattedDate = announcement?.created_at
    ? new Date(announcement.created_at).toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'Just now';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-950/60 backdrop-blur-xs animate-fadeIn">
      
      {/* Modal Dialog Box */}
      <div
        className="relative w-full max-w-lg bg-cream-100 dark:bg-academic-cardDark border-2 border-gold-400/80 dark:border-gold-500/60 rounded-2xl shadow-2xl p-5 sm:p-6 overflow-hidden flex flex-col space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-brown-200/60 dark:border-brown-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gold-400/20 dark:bg-gold-500/20 border border-gold-400/40 flex items-center justify-center text-gold-600 dark:text-gold-400">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100 flex items-center gap-2">
                Announcement
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-gold-400/20 text-brown-800 dark:text-gold-300 font-sans font-semibold">
                  Live
                </span>
              </h3>
              <p className="text-[11px] text-brown-500 dark:text-cream-400 font-sans flex items-center gap-1">
                <Clock className="w-3 h-3" /> {formattedDate}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-brown-400 hover:text-brown-700 dark:hover:text-cream-100 hover:bg-brown-200/50 dark:hover:bg-brown-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success Banner Toast */}
        {publishedNotice && (
          <div className="p-3 bg-forest-50 dark:bg-forest-950/60 border border-forest-300 dark:border-forest-700/60 rounded-xl text-forest-800 dark:text-forest-200 text-xs font-sans font-semibold flex items-center gap-2 animate-fadeIn">
            <Sparkles className="w-4 h-4 text-forest-600 dark:text-forest-400" />
            <span>Success! New announcement published live for everyone!</span>
          </div>
        )}

        {/* Announcement Message Box */}
        <div className="bg-white/80 dark:bg-brown-900/50 p-4 rounded-xl border border-brown-200/70 dark:border-brown-800 text-brown-900 dark:text-cream-100 text-sm font-sans leading-relaxed whitespace-pre-wrap shadow-inner min-h-[90px]">
          {announcement?.message || 'No announcement message available yet.'}
        </div>

        {/* Post / Edit Section */}
        {!isEditing ? (
          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-brown-400 dark:text-brown-500 font-sans">
              Visible to all readers across PC & Mobile
            </span>
            <button
              onClick={() => {
                setNewMessageText(announcement?.message || '');
                setIsEditing(true);
              }}
              className="py-1.5 px-3 rounded-xl bg-brown-100 hover:bg-brown-200 dark:bg-brown-800 dark:hover:bg-brown-700 text-brown-800 dark:text-cream-200 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Post New Announcement</span>
            </button>
          </div>
        ) : (
          <form onSubmit={handlePublish} className="space-y-3 pt-2 border-t border-brown-200/60 dark:border-brown-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold text-brown-900 dark:text-cream-100 flex items-center gap-1.5">
                <Edit3 className="w-3.5 h-3.5 text-gold-500" />
                Write Announcement Message:
              </label>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="text-[11px] text-brown-500 hover:text-brown-700 dark:hover:text-cream-300 underline"
              >
                Cancel
              </button>
            </div>

            <textarea
              rows={4}
              required
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              placeholder="Type your message here (e.g. 'Assalamu Alaikum! Today's Delhi editions are updated...')"
              className="w-full p-3 text-xs rounded-xl bg-white dark:bg-brown-900 border border-gold-400/60 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-500 font-sans leading-relaxed"
            />

            <button
              type="submit"
              disabled={isPublishing}
              className="w-full py-2.5 px-4 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isPublishing ? 'Publishing...' : 'Publish Announcement to Everyone'}</span>
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
