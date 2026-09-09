import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import TopHeader from './components/layout/TopHeader';
import StickyDuaNote from './components/widgets/StickyDuaNote';
import StreakWidget from './components/widgets/StreakWidget';
import FocusClock from './components/widgets/FocusClock';
import BrandNewspaperCard from './components/newspapers/BrandNewspaperCard';
import SimplePDFReader from './components/reader/SimplePDFReader';
import NotesSection from './components/notes/NotesSection';
import ResourceRequestWidget from './components/widgets/ResourceRequestWidget';
import AnnouncementModal from './components/common/AnnouncementModal';

import {
  getPapers, uploadPaperFile, savePaper,
  getNotes, saveNote, deleteNote,
  getStreak, saveStreak,
  getResourceRequests, saveResourceRequest,
  getAnnouncement, saveAnnouncement
} from './lib/storage';

export default function App() {
  const [activeView, setActiveView] = useState('dashboard'); // 'dashboard' | 'reader' | 'notes'
  const [isDarkMode, setIsDarkMode] = useState(false);

  // App Data
  const [papers, setPapers] = useState([]);
  const [notes, setNotes] = useState([]);
  const [streak, setStreak] = useState(null);
  const [requests, setRequests] = useState([]);

  // Announcement State
  const [announcement, setAnnouncement] = useState(null);
  const [hasUnreadAnnouncement, setHasUnreadAnnouncement] = useState(false);
  const [isAnnouncementOpen, setIsAnnouncementOpen] = useState(false);

  // Persistent Focus Clock Timer State
  const [timerTimeLeft, setTimerTimeLeft] = useState(25 * 60);
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [timerMode, setTimerMode] = useState('25m'); // '25m' | '5m'

  // Active Reader Paper
  const [activeReaderPaper, setActiveReaderPaper] = useState(null);

  // 1. Initial Data Loading
  useEffect(() => {
    async function loadData() {
      const pData = await getPapers();
      const nData = await getNotes();
      const sData = getStreak();
      const rData = await getResourceRequests();
      const aData = await getAnnouncement();

      setPapers(pData);
      setNotes(nData);
      setStreak(sData);
      setRequests(rData);
      setAnnouncement(aData);

      // Check if current announcement is unread
      if (aData?.id) {
        const lastRead = localStorage.getItem('arshi_last_read_announcement');
        if (lastRead !== aData.id) {
          setHasUnreadAnnouncement(true);
        }
      }
    }
    loadData();
  }, []);

  // Live Announcement Sync (Polls Supabase every 15s and on window focus)
  useEffect(() => {
    async function syncAnnouncement() {
      const aData = await getAnnouncement();
      if (aData?.id) {
        setAnnouncement(aData);
        const lastRead = localStorage.getItem('arshi_last_read_announcement');
        if (lastRead !== aData.id) {
          setHasUnreadAnnouncement(true);
        }
      }
    }

    const interval = setInterval(syncAnnouncement, 15000);
    window.addEventListener('focus', syncAnnouncement);
    return () => {
      clearInterval(interval);
      window.removeEventListener('focus', syncAnnouncement);
    };
  }, []);

  // 2. Dark Mode Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // 3. Persistent Timer Countdown Engine
  useEffect(() => {
    let interval = null;
    if (timerIsRunning && timerTimeLeft > 0) {
      interval = setInterval(() => {
        setTimerTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timerTimeLeft === 0 && timerIsRunning) {
      setTimerIsRunning(false);
      confetti({ particleCount: 60, spread: 60, origin: { y: 0.7 } });
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [timerIsRunning, timerTimeLeft]);

  const handleToggleTimer = () => setTimerIsRunning((r) => !r);

  const handleResetTimer = (newMode = timerMode) => {
    setTimerIsRunning(false);
    setTimerMode(newMode);
    setTimerTimeLeft(newMode === '25m' ? 25 * 60 : 5 * 60);
  };

  // Handle PDF File Upload with Supabase Storage Cloud Sync
  const handleUploadPaperFile = async (paperBrand, file) => {
    const updatedList = await uploadPaperFile(paperBrand, file);
    setPapers(updatedList);
  };

  // Open Paper in Reader Mode (Timer keeps running uninterrupted!)
  const handleOpenReader = (paper) => {
    if (!paper?.pdfUrl) return;
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

  // Save Resource Request
  const handleRequestResource = async (reqData) => {
    const updatedReqs = await saveResourceRequest(reqData);
    setRequests(updatedReqs);
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

  // Announcement Handlers
  const handleOpenAnnouncementModal = () => {
    setIsAnnouncementOpen(true);
    setHasUnreadAnnouncement(false);
    if (announcement?.id) {
      localStorage.setItem('arshi_last_read_announcement', announcement.id);
    }
  };

  const handlePublishAnnouncement = async (messageText) => {
    const newAnn = await saveAnnouncement(messageText);
    setAnnouncement(newAnn);
    setHasUnreadAnnouncement(false);
    localStorage.setItem('arshi_last_read_announcement', newAnn.id);
  };

  return (
    <div className="min-h-screen bg-cream-100 dark:bg-academic-paperDark text-brown-900 dark:text-cream-100 flex flex-col font-sans transition-colors duration-300">
      
      {/* Header */}
      <TopHeader
        activeView={activeView}
        setActiveView={setActiveView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        onOpenAnnouncement={handleOpenAnnouncementModal}
        hasUnreadAnnouncement={hasUnreadAnnouncement}
      />

      {/* Announcement Modal Popup */}
      <AnnouncementModal
        isOpen={isAnnouncementOpen}
        onClose={() => setIsAnnouncementOpen(false)}
        announcement={announcement}
        onPublish={handlePublishAnnouncement}
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
              <FocusClock
                timeLeft={timerTimeLeft}
                isRunning={timerIsRunning}
                mode={timerMode}
                onToggle={handleToggleTimer}
                onReset={handleResetTimer}
              />
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
                    onUploadFile={handleUploadPaperFile}
                  />
                ))}
              </div>
            </div>

            {/* 4. Arshi's Resource Request Widget */}
            <ResourceRequestWidget
              requests={requests}
              onRequestResource={handleRequestResource}
            />

          </div>
        )}

        {/* READER VIEW */}
        {activeView === 'reader' && activeReaderPaper && (
          <SimplePDFReader
            paper={activeReaderPaper}
            onBack={() => setActiveView('dashboard')}
            onSaveNote={handleSaveNote}
            timerTimeLeft={timerTimeLeft}
            timerIsRunning={timerIsRunning}
            onToggleTimer={handleToggleTimer}
            onResetTimer={handleResetTimer}
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
