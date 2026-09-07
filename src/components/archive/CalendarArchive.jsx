import React, { useState } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, BookOpen, CheckCircle2, Search, FileText } from 'lucide-react';
import NewspaperCard from '../dashboard/NewspaperCard';

export default function CalendarArchive({ newspapers = [], notes = [], onOpenReader, onToggleComplete }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [filterSource, setFilterSource] = useState('ALL');

  // Month navigation
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  // Calendar matrix calculation
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  // Map papers by date
  const paperDatesSet = new Set(newspapers.map(p => p.date));

  // Papers for selected date
  const selectedDatePapers = newspapers.filter(p => {
    const matchesDate = p.date === selectedDate;
    const matchesSource = filterSource === 'ALL' || p.source === filterSource;
    return matchesDate && matchesSource;
  });

  const selectedDateNotes = notes.filter(n => n.date === selectedDate);

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-brown-200/40 dark:border-brown-800/40">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-gold-700 dark:text-gold-400 font-sans tracking-wide uppercase">
            <CalendarIcon className="w-3.5 h-3.5" />
            <span>Archive Desk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-brown-900 dark:text-cream-100 tracking-tight mt-1">
            Monthly Newspaper Archive
          </h1>
        </div>

        {/* Source Filter Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-brown-500 font-sans">Filter Brand:</span>
          <select
            value={filterSource}
            onChange={(e) => setFilterSource(e.target.value)}
            className="px-3 py-1.5 text-xs font-semibold rounded-xl bg-white dark:bg-brown-900 border border-brown-200 dark:border-brown-700 text-brown-900 dark:text-cream-100 focus:outline-none shadow-sm"
          >
            <option value="ALL">All Papers</option>
            <option value="The Hindu">The Hindu</option>
            <option value="Indian Express">Indian Express</option>
            <option value="The Times of India">The Times of India</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Calendar View (1 Column) */}
        <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-5 shadow-academic space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="font-serif font-bold text-base text-brown-900 dark:text-cream-100">
              {monthName}
            </h3>
            <div className="flex items-center gap-1">
              <button
                onClick={prevMonth}
                className="p-1.5 rounded-lg hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-300"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextMonth}
                className="p-1.5 rounded-lg hover:bg-brown-100 dark:hover:bg-brown-800 text-brown-700 dark:text-cream-300"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Days Grid Header */}
          <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-brown-500 dark:text-cream-400 font-sans uppercase">
            <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-xs font-sans">
            {/* Empty slots before month start */}
            {Array.from({ length: firstDayIndex }).map((_, i) => (
              <div key={`empty-${i}`} className="h-9 rounded-lg" />
            ))}

            {/* Month days */}
            {Array.from({ length: daysInMonth }).map((_, idx) => {
              const dayNum = idx + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
              const hasPaper = paperDatesSet.has(dateStr);
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={dayNum}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-9 rounded-xl flex flex-col items-center justify-center relative font-semibold transition-all ${
                    isSelected
                      ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-sm scale-105 font-bold'
                      : hasPaper
                      ? 'bg-gold-50 dark:bg-brown-900/60 text-brown-900 dark:text-cream-100 border border-gold-300/50 hover:bg-gold-100'
                      : 'bg-cream-50/40 dark:bg-brown-900/20 text-brown-400 dark:text-cream-400 hover:bg-brown-50'
                  }`}
                >
                  <span>{dayNum}</span>
                  {hasPaper && !isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-500 absolute bottom-1" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-brown-200/30 dark:border-brown-800/30 flex items-center justify-between text-[11px] text-brown-500 font-sans">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-gold-500" /> Paper Available
            </span>
            <span>Selected: {selectedDate}</span>
          </div>

        </div>

        {/* Selected Date Content Grid (2 Columns) */}
        <div className="lg:col-span-2 space-y-6">
          
          <div>
            <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100 mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-gold-600" />
              Newspapers for {selectedDate}
            </h3>

            {selectedDatePapers.length === 0 ? (
              <div className="bg-white dark:bg-academic-cardDark rounded-2xl border border-brown-200/60 dark:border-academic-borderDark p-8 text-center text-brown-500 dark:text-cream-400 font-serif italic space-y-2">
                <p>No newspapers recorded for this date.</p>
                <p className="text-xs font-sans text-gold-700 dark:text-gold-400">
                  Select another highlighted date on the calendar or upload a PDF for {selectedDate}.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedDatePapers.map((paper) => (
                  <NewspaperCard
                    key={paper.id}
                    paper={paper}
                    onOpenReader={onOpenReader}
                    onToggleComplete={onToggleComplete}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Notes on selected date */}
          {selectedDateNotes.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-lg text-brown-900 dark:text-cream-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-forest-600" />
                GS Notes Recorded ({selectedDateNotes.length})
              </h3>
              <div className="space-y-2">
                {selectedDateNotes.map(n => (
                  <div key={n.id} className="p-3.5 rounded-xl bg-white dark:bg-academic-cardDark border border-brown-200/60 dark:border-academic-borderDark space-y-1 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300">
                        {n.gs_category}
                      </span>
                      <span className="text-xs text-brown-500 font-serif italic">{n.source}</span>
                    </div>
                    <h4 className="font-serif font-bold text-sm text-brown-900 dark:text-cream-100">
                      {n.title}
                    </h4>
                    <p className="text-xs text-brown-700 dark:text-cream-300 line-clamp-2 font-sans">
                      {n.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
