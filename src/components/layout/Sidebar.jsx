import React from 'react';
import { Home, BookOpen, FileText, Calendar, BookCheck, HelpCircle, Upload, CheckCircle2 } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, todayCompleted, onOpenUpload }) {
  const navItems = [
    { id: 'home', label: 'Home Dashboard', icon: Home, badge: null },
    { id: 'reader', label: 'PDF Reader', icon: BookOpen, badge: todayCompleted ? 'Completed' : 'Today' },
    { id: 'notes', label: 'GS Notes Editor', icon: FileText, badge: null },
    { id: 'archive', label: 'Monthly Archive', icon: Calendar, badge: null },
    { id: 'syllabus', label: 'UPSC Syllabus', icon: BookCheck, badge: null },
    { id: 'guide', label: 'Free PDF Guide', icon: HelpCircle, badge: 'Free' },
  ];

  return (
    <aside className="w-full md:w-64 bg-cream-50/80 dark:bg-academic-cardDark/60 border-r border-brown-200/50 dark:border-academic-borderDark p-4 flex flex-col justify-between shrink-0 transition-colors duration-300">
      <div className="space-y-6">
        
        {/* Navigation Section */}
        <div>
          <h4 className="text-xs font-semibold text-brown-400 dark:text-cream-400 uppercase tracking-wider px-3 mb-2 font-sans">
            Navigation
          </h4>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-brown-500 text-cream-100 dark:bg-gold-400 dark:text-brown-950 shadow-sm font-semibold'
                      : 'text-brown-700 dark:text-cream-200 hover:bg-brown-100/60 dark:hover:bg-brown-800/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-gold-300 dark:text-brown-900' : 'text-brown-500 dark:text-cream-300'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        item.badge === 'Completed'
                          ? 'bg-forest-100 text-forest-800 dark:bg-forest-950 dark:text-forest-300 border border-forest-300/40'
                          : 'bg-gold-100 text-gold-800 dark:bg-gold-950 dark:text-gold-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Today's Reading Quick Status */}
        <div className="p-4 rounded-xl bg-brown-50/80 dark:bg-brown-900/40 border border-brown-200/60 dark:border-brown-800/60 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-brown-900 dark:text-gold-300 font-serif">
              Today's Reading Target
            </span>
            {todayCompleted ? (
              <span className="text-forest-600 dark:text-forest-400 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Done
              </span>
            ) : (
              <span className="text-gold-600 dark:text-gold-400 font-medium">In Progress</span>
            )}
          </div>
          <p className="text-xs text-brown-600 dark:text-cream-300 leading-relaxed font-sans">
            {todayCompleted
              ? "Mashallah Arshi! You completed today's paper."
              : "Read today's lead editorial & take 1 GS note."}
          </p>
          <button
            onClick={() => setActiveTab('reader')}
            className="w-full mt-1 text-xs py-1.5 px-3 rounded-lg bg-brown-500 hover:bg-brown-600 dark:bg-gold-400 dark:hover:bg-gold-500 text-cream-100 dark:text-brown-950 font-medium transition-all"
          >
            {todayCompleted ? 'Review PDF Notes' : 'Continue Reading'}
          </button>
        </div>

      </div>

      {/* Upload Callout at Sidebar Bottom */}
      <div className="pt-4 border-t border-brown-200/40 dark:border-brown-800/40">
        <button
          onClick={onOpenUpload}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-forest-50 hover:bg-forest-100 dark:bg-forest-950/40 dark:hover:bg-forest-900/40 text-forest-800 dark:text-forest-300 border border-forest-300/40 text-xs font-semibold transition-all"
        >
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Daily Paper PDF</span>
        </button>
      </div>
    </aside>
  );
}
