import React, { useState, useEffect } from 'react';
import TopHeader from './components/layout/TopHeader';
import StickyDuaNote from './components/widgets/StickyDuaNote';
import StreakWidget from './components/widgets/StreakWidget';
import FocusClock from './components/widgets/FocusClock';
import BrandNewspaperCard from './components/newspapers/BrandNewspaperCard';
import SimplePDFReader from './components/reader/SimplePDFReader';
import NotesSection from './components/notes/NotesSection';

import { getPapers, savePaper, getNotes, saveNote, deleteNote, getStreak, saveStreak } from './lib/storage';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'reader' | 'notes'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // App Data
  const [papers, setPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [streak, setStreak] = useState(null);

  // Active Reader Paper
  const [activeReaderPaper, setActiveReaderPaper] = useState(null);

  useEffect(() => {
    async function loadData() {
      const pData = await getPapers();
      const nData = await getNotes();
      const sData = getStreak();

      setPapers(pData);
      setNotes(nData);
      setStreak(sData);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle PDF Upload for a specific paper brand card
  const handleUploadPaper = async (updatedPaper) => {
    const updatedList = await savePaper(updatedPaper);
    setPapers(updatedList);
  };

  // Open Paper in Reader Mode
  const handleOpenReader = (paper) => {
    setActiveReaderPaper(paper);
    setActiveView('reader');
  };

  // Save Note
  const handleSaveNote = async (noteData) => {
    const updatedNotes = await saveNote(noteData);
    setNotes(updatedNotes);
  };

  // Delete Note
  const handleDeleteNote = async (noteId) => {
    const updatedNotes = await deleteNote(noteId);
    setNotes(updatedNotes);
  };

  // Toggle Today's Reading Completion
  const handleToggleStreakComplete = (completed) => {
    const newStreak = {
      ...streak,
      today_completed: completed,
      streak_count: completed ? (streak?.streak_count || 14) + 1 : (streak?.streak_count || 14)
    };
    saveStreak(newStreak);
    setStreak(newStreak);
  };

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-academic-paperDark text-brown-900 dark:text-cream-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Header */}
      <TopHeader
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 space-y-6">
        
        {/* DASHBOARD VIEW */}
        {activeView === 'dashboard' && (
          <div className="space-y-6">
            
            {/* 1. Parchment Sticky Note: "Salam Arshi" + Dua */}
            <StickyDuaNote />

            {/* 2. Top Row Widgets: Streak Counter & Focus Clock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <StreakWidget
                streak={streak}
                onToggleTodayComplete={handleToggleStreakComplete}
              />
              <FocusClock />
            </div>

            {/* 3. Three Dedicated Newspaper Cards */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between">
                <h2 className="font-serif font-bold text-xl text-brown-900 dark:text-cream-100">
                  Daily UPSC Newspapers
                </h2>
                <span className="text-xs text-brown-500 font-sans">
                  The Hindu &bull; Indian Express &bull; TOI
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {papers.map((paper) => (
                  <BrandNewspaperCard
                    key={paper.id}
                    paper={paper}
                    onOpenReader={handleOpenReader}
                    onUploadPaper={handleUploadPaper}
                    onToggleComplete={() => {}}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* READER VIEW */}
        {activeView === 'reader' && activeReaderPaper && (
          <SimplePDFReader
            paper={activeReaderPaper}
            onBack={() => setActiveView('dashboard')}
            onSaveNote={handleSaveNote}
          />
        )}

        {/* NOTES VIEW */}
        {activeView === 'notes' && (
          <NotesSection
            notes={notes}
            onSaveNote={handleSaveNote}
            onDeleteNote={handleDeleteNote}
          />
        )}

      </main>

    </div>
  );
}
