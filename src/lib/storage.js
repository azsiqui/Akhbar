import { INITIAL_BRANDS, INITIAL_NOTES, INITIAL_STREAK, INITIAL_RESOURCE_REQUESTS } from '../data/initialData';
import { supabase, isSupabaseConfigured } from './supabase';

const KEYS = {
  PAPERS: 'arshi_v3_papers',
  NOTES: 'arshi_v3_notes',
  STREAK: 'arshi_v3_streak',
  REQUESTS: 'arshi_v3_requests'
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
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('newspapers').select('*').order('date', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(KEYS.PAPERS, data);
        return data;
      }
    } catch (e) {}
  }
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
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('notes').select('*').order('created_at', { ascending: false });
      if (!error && data && data.length > 0) {
        setLocal(KEYS.NOTES, data);
        return data;
      }
    } catch (e) {}
  }
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

  if (isSupabaseConfigured) {
    try {
      await supabase.from('notes').upsert(note);
    } catch (e) {}
  }
  return updated;
}

export async function deleteNote(id) {
  const notes = await getNotes();
  const updated = notes.filter(n => n.id !== id);
  setLocal(KEYS.NOTES, updated);

  if (isSupabaseConfigured) {
    try {
      await supabase.from('notes').delete().eq('id', id);
    } catch (e) {}
  }
  return updated;
}

export function getStreak() {
  return getLocal(KEYS.STREAK, INITIAL_STREAK);
}

export function saveStreak(streak) {
  setLocal(KEYS.STREAK, streak);
  return streak;
}

// --- RESOURCE REQUESTS API ---
export async function getResourceRequests() {
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.from('resource_requests').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        setLocal(KEYS.REQUESTS, data);
        return data;
      }
    } catch (e) {}
  }
  return getLocal(KEYS.REQUESTS, INITIAL_RESOURCE_REQUESTS);
}

export async function saveResourceRequest(reqData) {
  const requests = await getResourceRequests();
  const newReq = {
    ...reqData,
    id: reqData.id || `req-${Date.now()}`,
    status: reqData.status || 'Pending',
    created_at: new Date().toISOString()
  };
  const updated = [newReq, ...requests];
  setLocal(KEYS.REQUESTS, updated);

  if (isSupabaseConfigured) {
    try {
      await supabase.from('resource_requests').upsert(newReq);
    } catch (e) {}
  }
  return updated;
}
