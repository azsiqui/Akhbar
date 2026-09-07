import React from 'react';
import { X, HelpCircle, Send, Upload, Cpu, FolderSync, CheckCircle2, Sparkles } from 'lucide-react';

export default function PdfGuideModal({ onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-brown-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-academic-cardDark w-full max-w-2xl max-h-[90vh] rounded-2xl border border-brown-200/80 dark:border-academic-borderDark shadow-academic-lg flex flex-col overflow-hidden transition-all">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-brown-200/60 dark:border-academic-borderDark flex items-center justify-between bg-gold-50/80 dark:bg-gold-950/40">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-gold-400 text-brown-950">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-gold-200">
                4 Free Ways to Get Daily Newspapers in Akhbar
              </h3>
              <p className="text-xs text-brown-600 dark:text-cream-300 font-sans">
                Automated & manual options for UPSC aspirants
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

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-4 font-sans text-xs text-brown-800 dark:text-cream-200 leading-relaxed">
          
          {/* Option 1: In-App Drag & Drop */}
          <div className="p-4 rounded-xl bg-cream-50/80 dark:bg-brown-900/40 border border-brown-200/60 dark:border-brown-800 space-y-2">
            <div className="flex items-center gap-2 text-forest-700 dark:text-forest-400 font-bold font-serif text-sm">
              <Upload className="w-4 h-4" />
              <span>1. In-App Drag & Drop (Built-In & Easiest)</span>
            </div>
            <p>
              Simply click the <strong>"Upload PDF"</strong> button in the navbar. Drop today's newspaper PDF from your computer or phone. It saves instantly into Akhbar's database & local storage so Arshi can start reading in seconds.
            </p>
          </div>

          {/* Option 2: Telegram Channels & Bots */}
          <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900 space-y-2">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-bold font-serif text-sm">
              <Send className="w-4 h-4" />
              <span>2. Telegram Channels / Bot Sync (Free & Automated)</span>
            </div>
            <p>
              UPSC Telegram channels publish daily e-papers (*The Hindu*, *Indian Express*) every morning by 5:30 AM – 6:00 AM IST. You can run a small free Python script (`Telethon`) on GitHub Actions or Render that automatically forwards Telegram channel PDFs directly into your Supabase Storage.
            </p>
          </div>

          {/* Option 3: Automated GitHub Actions Cron Job */}
          <div className="p-4 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900 space-y-2">
            <div className="flex items-center gap-2 text-blue-800 dark:text-blue-300 font-bold font-serif text-sm">
              <Cpu className="w-4 h-4" />
              <span>3. GitHub Actions Daily Cron (100% Free Cloud Automation)</span>
            </div>
            <p>
              Set up a scheduled GitHub Action that runs daily at `06:00 AM IST`. The action fetches today's e-paper PDF link, uploads it to Supabase Storage, and inserts a row into the database. Akhbar automatically shows today's fresh paper!
            </p>
          </div>

          {/* Option 4: Google Drive Shared Folder */}
          <div className="p-4 rounded-xl bg-purple-50/80 dark:bg-purple-950/30 border border-purple-200/60 dark:border-purple-900 space-y-2">
            <div className="flex items-center gap-2 text-purple-800 dark:text-purple-300 font-bold font-serif text-sm">
              <FolderSync className="w-4 h-4" />
              <span>4. Google Drive Shared Folder</span>
            </div>
            <p>
              Keep a shared Google Drive folder where you drop PDFs. Paste the Drive public link into Akhbar or sync it directly.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-cream-50/80 dark:bg-brown-900/40 border-t border-brown-200/60 dark:border-academic-borderDark flex justify-end">
          <button
            onClick={onClose}
            className="py-2 px-5 rounded-xl bg-brown-500 hover:bg-brown-600 text-cream-100 text-xs font-bold transition-all"
          >
            Got it, thanks!
          </button>
        </div>

      </div>
    </div>
  );
}
