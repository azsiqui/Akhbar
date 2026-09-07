-- Arshi's Desk - Supabase Database & Storage Schema

-- 1. Newspapers Table
CREATE TABLE IF NOT EXISTS newspapers (
  id TEXT PRIMARY KEY,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  title TEXT NOT NULL,
  source TEXT NOT NULL,
  pdf_url TEXT NOT NULL,
  thumbnail_url TEXT,
  page_count INT DEFAULT 14,
  read_page INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  editorial_highlight TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Notes Table
CREATE TABLE IF NOT EXISTS notes (
  id TEXT PRIMARY KEY,
  newspaper_id TEXT,
  title TEXT NOT NULL,
  gs_category TEXT NOT NULL DEFAULT 'GS3',
  source TEXT,
  date DATE DEFAULT CURRENT_DATE,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Resource Requests Table (Arshi's Wishlist)
CREATE TABLE IF NOT EXISTS resource_requests (
  id TEXT PRIMARY KEY,
  resource_name TEXT NOT NULL,
  category TEXT DEFAULT 'Monthly Magazine',
  note TEXT,
  status TEXT DEFAULT 'Pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Database Row Level Security
ALTER TABLE newspapers ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE resource_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all newspapers" ON newspapers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all notes" ON notes FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all resource_requests" ON resource_requests FOR ALL USING (true) WITH CHECK (true);

-- 4. Storage Bucket Policies for 'newspapers' Bucket
-- (Allows uploading PDF files directly from web app without authentication)
CREATE POLICY "Allow public uploads to newspapers bucket"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'newspapers');

CREATE POLICY "Allow public updates to newspapers bucket"
ON storage.objects FOR UPDATE
USING (bucket_id = 'newspapers');

CREATE POLICY "Allow public select from newspapers bucket"
ON storage.objects FOR SELECT
USING (bucket_id = 'newspapers');
