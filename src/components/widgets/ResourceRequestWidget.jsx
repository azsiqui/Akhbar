import React, { useState } from 'react';
import { BookPlus, Send, CheckCircle2, Clock, Sparkles } from 'lucide-react';

export default function ResourceRequestWidget({ requests = [], onRequestResource }) {
  const [resourceName, setResourceName] = useState('');
  const [category, setCategory] = useState('Monthly Magazine');
  const [note, setNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!resourceName.trim()) return;

    onRequestResource({
      resource_name: resourceName,
      category,
      note
    });

    setResourceName('');
    setNote('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 2500);
  };

  return (
    <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-5 shadow-academic space-y-5">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-3 border-brown-200/40 dark:border-brown-800">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-gold-400 text-brown-950 font-bold">
            <BookPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100">
              Request a Study Resource
            </h3>
            <p className="text-xs text-brown-500 dark:text-cream-400 font-sans">
              Need a magazine, book, or extra paper? Write it here for your brother!
            </p>
          </div>
        </div>

        <span className="text-xs text-gold-700 dark:text-gold-400 font-serif italic hidden sm:block">
          Arshi's Wishlist Desk
        </span>
      </div>

      {/* Request Input Form */}
      <form onSubmit={handleSubmit} className="space-y-3 font-sans text-xs">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="sm:col-span-2">
            <label className="font-bold text-brown-500 dark:text-cream-400 uppercase block mb-1">
              Resource Title / Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Vision IAS August Monthly, Yojana Magazine, Spectrum History..."
              value={resourceName}
              onChange={(e) => setResourceName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none focus:ring-1 focus:ring-gold-400"
            />
          </div>

          <div>
            <label className="font-bold text-brown-500 dark:text-cream-400 uppercase block mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none font-semibold"
            >
              <option value="Monthly Magazine">Monthly Magazine</option>
              <option value="Reference Book">Reference Book</option>
              <option value="Extra Newspaper">Extra Newspaper</option>
              <option value="Test Series / Notes">Test Series / Notes</option>
            </select>
          </div>
        </div>

        <div>
          <label className="font-bold text-brown-500 dark:text-cream-400 uppercase block mb-1">
            Notes / Specific Edition (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. August edition PDF or latest standard version"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-cream-50 dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          {submitted ? (
            <span className="text-xs text-forest-600 dark:text-forest-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Request sent! Saved to database.
            </span>
          ) : (
            <span className="text-xs text-brown-500 dark:text-cream-400 font-sans italic">
              Auto-saves to database for your brother to view
            </span>
          )}

          <button
            type="submit"
            className="py-2 px-5 rounded-xl bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Send Request</span>
          </button>
        </div>

      </form>

      {/* Requested Items List */}
      {requests.length > 0 && (
        <div className="pt-3 border-t border-brown-200/40 dark:border-brown-800 space-y-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-brown-500 dark:text-cream-400 font-sans">
            Requested Resources Log ({requests.length})
          </h4>

          <div className="space-y-2">
            {requests.map(req => (
              <div
                key={req.id}
                className="p-3 rounded-xl bg-cream-50/70 dark:bg-brown-900/30 border border-brown-200/40 dark:border-brown-800 flex items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-brown-900 dark:text-cream-100">
                      {req.resource_name}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-gold-100 text-gold-900 dark:bg-gold-950 dark:text-gold-300 font-sans font-semibold">
                      {req.category}
                    </span>
                  </div>
                  {req.note && (
                    <p className="text-[11px] text-brown-600 dark:text-cream-300 font-serif italic">
                      "{req.note}"
                    </p>
                  )}
                </div>

                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full shrink-0 flex items-center gap-1 ${
                  req.status === 'Completed'
                    ? 'bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300'
                    : 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300'
                }`}>
                  <Clock className="w-3 h-3" />
                  <span>{req.status || 'Pending'}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
