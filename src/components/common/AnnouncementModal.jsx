import React, { useState, useEffect } from 'react';
import { Megaphone, X, Send, Sparkles, Clock, Edit3, Lock, Key, ShieldCheck } from 'lucide-react';

export default function AnnouncementModal({
  isOpen,
  onClose,
  announcement,
  onPublish
}) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [newMessageText, setNewMessageText] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedNotice, setPublishedNotice] = useState(false);

  useEffect(() => {
    const adminSaved = localStorage.getItem('arshi_desk_admin_unlocked');
    if (adminSaved === 'true') {
      setIsAdmin(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleUnlockAdmin = (e) => {
    e.preventDefault();
    const cleaned = pinInput.trim();
    if (cleaned === '910232') {
      setIsAdmin(true);
      localStorage.setItem('arshi_desk_admin_unlocked', 'true');
      setShowPinPrompt(false);
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

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
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brown-950/60 backdrop-blur-xs animate-fadeIn"
      onClick={onClose}
    >
      
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
            <span>Success! Announcement published live for all readers!</span>
          </div>
        )}

        {/* Read-Only Announcement Message Box */}
        <div className="bg-white/80 dark:bg-brown-900/50 p-4 rounded-xl border border-brown-200/70 dark:border-brown-800 text-brown-900 dark:text-cream-100 text-sm font-sans leading-relaxed whitespace-pre-wrap shadow-inner min-h-[90px]">
          {announcement?.message || 'No announcement message available yet.'}
        </div>

        {/* Footer / Admin Posting Section */}
        <div className="pt-2 border-t border-brown-200/60 dark:border-brown-800 flex flex-col space-y-3">
          
          {/* 1. Normal View (Non-Admin) */}
          {!isAdmin && !showPinPrompt && (
            <div className="flex items-center justify-between text-[11px] text-brown-500 dark:text-cream-400 font-sans">
              <span>Updated daily for Arshi's Desk</span>
              <button
                onClick={() => setShowPinPrompt(true)}
                className="text-brown-400 hover:text-brown-700 dark:hover:text-gold-300 flex items-center gap-1 font-semibold transition-colors"
                title="Admin Passcode Entry"
              >
                <Lock className="w-3 h-3" />
                <span>Admin Login</span>
              </button>
            </div>
          )}

          {/* 2. Admin Passcode Input Prompt */}
          {!isAdmin && showPinPrompt && (
            <form onSubmit={handleUnlockAdmin} className="space-y-2 p-3 bg-brown-50 dark:bg-brown-900/60 rounded-xl border border-brown-200 dark:border-brown-700">
              <div className="flex items-center justify-between text-xs font-bold text-brown-900 dark:text-cream-100">
                <span className="flex items-center gap-1 text-gold-600 dark:text-gold-400">
                  <Key className="w-3.5 h-3.5" /> Enter Admin Passcode:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setShowPinPrompt(false);
                    setPinError(false);
                  }}
                  className="text-[10px] text-brown-500 hover:underline"
                >
                  Cancel
                </button>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="password"
                  required
                  value={pinInput}
                  onChange={(e) => {
                    setPinInput(e.target.value);
                    setPinError(false);
                  }}
                  placeholder="Enter passcode..."
                  className="flex-1 p-2 text-xs rounded-lg bg-white dark:bg-brown-950 border border-brown-300 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
                />
                <button
                  type="submit"
                  className="px-3 py-2 rounded-lg bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:text-brown-950 text-cream-100 text-xs font-bold transition-all"
                >
                  Unlock
                </button>
              </div>

              {pinError && (
                <p className="text-[10px] text-red-600 font-semibold">
                  Incorrect passcode. Please try again.
                </p>
              )}
            </form>
          )}

          {/* 3. Admin Unlocked Controls */}
          {isAdmin && !isEditing && (
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-forest-600 dark:text-forest-400 font-sans font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Admin Unlocked
              </span>
              <button
                onClick={() => {
                  setNewMessageText(announcement?.message || '');
                  setIsEditing(true);
                }}
                className="py-1.5 px-3 rounded-xl bg-brown-500 hover:bg-brown-600 text-cream-100 dark:bg-gold-400 dark:hover:bg-gold-500 dark:text-brown-950 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Post New Announcement</span>
              </button>
            </div>
          )}

          {/* 4. Write & Publish Announcement Form */}
          {isAdmin && isEditing && (
            <form onSubmit={handlePublish} className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-serif font-bold text-brown-900 dark:text-cream-100 flex items-center gap-1.5">
                  <Edit3 className="w-3.5 h-3.5 text-gold-500" />
                  Write Announcement (Broadcast to everyone):
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
                placeholder="Type your message here..."
                className="w-full p-3 text-xs rounded-xl bg-white dark:bg-brown-900 border border-gold-400/60 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-500 font-sans leading-relaxed"
              />

              <button
                type="submit"
                disabled={isPublishing}
                className="w-full py-2.5 px-4 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isPublishing ? 'Publishing...' : 'Publish Announcement Live'}</span>
              </button>
            </form>
          )}

        </div>

      </div>
    </div>
  );
}
