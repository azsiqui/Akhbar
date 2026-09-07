-- Akhbar Supabase Database Schema

-- 1. Newspapers Table
CREATE TABLE IF NOT EXISTS newspapers (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  thumbnail_url TEXT,
  page_count INT DEFAULT 1,
  read_page INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  editorial_highlight TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Notes Table
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  newspaper_id TEXT REFERENCES newspapers(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  gs_category TEXT NOT NULL DEFAULT 'GS3',
  source TEXT,
  date DATE DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Bookmarks Table
CREATE TABLE IF NOT EXISTS bookmarks (
  id TEXT PRIMARY KEY,
  newspaper_id TEXT REFERENCES newspapers(id) ON DELETE CASCADE,
  page INT NOT NULL,
  title TEXT NOT NULL,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Progress Table
CREATE TABLE IF NOT EXISTS progress (
  id SERIAL PRIMARY KEY,
  date DATE UNIQUE NOT NULL DEFAULT CURRENT_DATE,
  completed BOOLEAN DEFAULT FALSE,
  pages_read INT DEFAULT 0,
  streak_count INT DEFAULT 1,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Security Policies (Open read/write for single-user app)
ALTER TABLE newspapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous all access on newspapers" ON newspapers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all access on notes" ON notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all access on bookmarks" ON bookmarks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow anonymous all access on progress" ON progress FOR ALL USING (true) WITH CHECK (true);

-- Storage Bucket Setup for Newspaper PDFs
-- Run in Supabase SQL editor or UI:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('newspapers', 'newspapers', true);
