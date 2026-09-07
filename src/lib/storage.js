import { INITIAL_BRANDS, INITIAL_NOTES, INITIAL_STREAK } from '../data/initialData';
import { supabase, isSupabaseConfigured } from './supabase';

const KEYS = {
  PAPERS: 'akhbar_v2_papers',
  NOTES: 'akhbar_v2_notes',
  STREAK: 'akhbar_v2_streak'
};

function getLocal(key, fallback) {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocal(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error(`Storage save error for ${key}:`, e);
  }
}

export async function getPapers() {
  return getLocal(KEYS.PAPERS, INITIAL_BRANDS);
}

export async function savePaper(updatedPaper) {
  const papers = await getPapers();
  const index = papers.findIndex(p => p.id === updatedPaper.id);
  let updated;
  if (index >= 0) {
    updated = [...papers];
    updated[index] = { ...updated[index], ...updatedPaper };
  } else {
    updated = [updatedPaper, ...papers];
  }
  setLocal(KEYS.PAPERS, updated);

  if (isSupabaseConfigured) {
    try {
      await supabase.from('newspapers').upsert(updatedPaper);
    } catch (e) {}
  }
  return updated;
}

export async function getNotes() {
  return getLocal(KEYS.NOTES, INITIAL_NOTES);
}

export async function saveNote(note) {
  const notes = await getNotes();
  const index = notes.findIndex(n => n.id === note.id);
  let updated;
  if (index >= 0) {
    updated = [...notes];
    updated[index] = note;
  } else {
    updated = [{ ...note, id: note.id || `note-${Date.now()}`, created_at: new Date().toISOString() }, ...notes];
  }
  setLocal(KEYS.NOTES, updated);
  return updated;
}

export async function deleteNote(id) {
  const notes = await getNotes();
  const updated = notes.filter(n => n.id !== id);
  setLocal(KEYS.NOTES, updated);
  return updated;
}

export function getStreak() {
  return getLocal(KEYS.STREAK, INITIAL_STREAK);
}

export function saveStreak(streak) {
  setLocal(KEYS.STREAK, streak);
  return streak;
}
