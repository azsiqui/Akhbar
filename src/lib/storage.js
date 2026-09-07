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
  const todayDate = new Date().toISOString().split('T')[0];

  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Fetch records from Supabase Database
      const { data: dbData, error: dbError } = await supabase
        .from('newspapers')
        .select('*')
        .order('created_at', { ascending: false });

      // 2. Also check files in Storage bucket 'newspapers' for today
      let storageFilesMap = {};
      try {
        const { data: storageData } = await supabase.storage
          .from('newspapers')
          .list(todayDate);

        if (storageData && storageData.length > 0) {
          storageData.forEach(file => {
            const { data: urlData } = supabase.storage
              .from('newspapers')
              .getPublicUrl(`${todayDate}/${file.name}`);
            
            if (urlData?.publicUrl) {
              const nameLower = file.name.toLowerCase();
              if (nameLower.includes('hindu')) storageFilesMap['The Hindu'] = urlData.publicUrl;
              if (nameLower.includes('express') || nameLower.includes('ie')) storageFilesMap['The Indian Express'] = urlData.publicUrl;
              if (nameLower.includes('times') || nameLower.includes('toi')) storageFilesMap['The Times of India'] = urlData.publicUrl;
            }
          });
        }
      } catch (e) {
        console.warn('Storage list check note:', e);
      }

      // Combine database records + storage files
      const formatted = INITIAL_BRANDS.map(brand => {
        let pdfUrl = storageFilesMap[brand.brandName] || null;
        let paperDate = todayDate;

        if (dbData && dbData.length > 0) {
          const matched = dbData.find(d =>
            (d.source && d.source.toLowerCase().includes(brand.brandName.toLowerCase())) ||
            (d.title && d.title.toLowerCase().includes(brand.brandName.toLowerCase()))
          );
          if (matched) {
            pdfUrl = matched.pdf_url || matched.pdfUrl || pdfUrl;
            paperDate = matched.date || paperDate;
          }
        }

        return {
          ...brand,
          pdfUrl,
          date: paperDate,
          readPage: pdfUrl ? 1 : 0,
          completed: false,
          editorialSnippet: pdfUrl
            ? `Today's edition available (${paperDate}).`
            : `Upload today's edition of ${brand.brandName} using the button below.`
        };
      });

      setLocal(KEYS.PAPERS, formatted);
      return formatted;
    } catch (e) {
      console.error('Failed to get newspapers from Supabase:', e);
    }
  }
  return getLocal(KEYS.PAPERS, INITIAL_BRANDS);
}

export async function uploadPaperFile(paperBrand, file) {
  const todayDate = new Date().toISOString().split('T')[0];
  const brandSlug = paperBrand.id;
  const storagePath = `${todayDate}/${brandSlug}.pdf`;

  let publicUrl = null;

  if (isSupabaseConfigured && supabase) {
    try {
      // 1. Upload PDF file directly to Supabase Storage bucket 'newspapers'
      const { error: uploadError } = await supabase.storage
        .from('newspapers')
        .upload(storagePath, file, {
          contentType: 'application/pdf',
          upsert: true
        });

      if (uploadError) {
        console.error('Supabase storage upload error:', uploadError);
        alert(`Supabase Storage Notice: ${uploadError.message}`);
      } else {
        const { data: urlData } = supabase.storage
          .from('newspapers')
          .getPublicUrl(storagePath);
        publicUrl = urlData?.publicUrl;
      }
    } catch (e) {
      console.error('Storage upload exception:', e);
    }
  } else {
    alert('Notice: Supabase environment variables missing on Vercel.');
  }

  // Fallback to local Blob URL if offline
  if (!publicUrl) {
    publicUrl = URL.createObjectURL(file);
  }

  const paperRecord = {
    id: `np-${brandSlug}-${todayDate}`,
    date: todayDate,
    title: paperBrand.brandName,
    source: paperBrand.brandName,
    pdf_url: publicUrl,
    page_count: 14,
    read_page: 1,
    completed: false
  };

  if (isSupabaseConfigured && supabase) {
    try {
      const { error: dbError } = await supabase.from('newspapers').upsert(paperRecord);
      if (dbError) {
        console.error('Supabase database upsert error:', dbError);
      }
    } catch (e) {
      console.error('Database exception:', e);
    }
  }

  return await getPapers();
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

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('newspapers').upsert({
        id: updatedPaper.id,
        date: updatedPaper.date,
        title: updatedPaper.brandName || updatedPaper.title,
        source: updatedPaper.brandName || updatedPaper.source,
        pdf_url: updatedPaper.pdfUrl,
        read_page: updatedPaper.readPage,
        completed: updatedPaper.completed
      });
    } catch (e) {}
  }
  return updated;
}

export async function getNotes() {
  if (isSupabaseConfigured && supabase) {
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

  if (isSupabaseConfigured && supabase) {
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

  if (isSupabaseConfigured && supabase) {
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

// --- RESOURCE REQUESTS (Arshi's Wishlist) ---
export async function getResourceRequests() {
  if (isSupabaseConfigured && supabase) {
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
    id: reqData.id || `req-${Date.now()}`,
    resource_name: reqData.resource_name,
    category: reqData.category || 'Monthly Magazine',
    note: reqData.note || '',
    status: reqData.status || 'Pending',
    created_at: new Date().toISOString()
  };

  const updated = [newReq, ...requests];
  setLocal(KEYS.REQUESTS, updated);

  if (isSupabaseConfigured && supabase) {
    try {
      const { error } = await supabase.from('resource_requests').insert([newReq]);
      if (error) {
        console.error('Supabase resource_requests insert error:', error);
      }
    } catch (e) {
      console.error('Supabase sync exception:', e);
    }
  }

  return updated;
}
