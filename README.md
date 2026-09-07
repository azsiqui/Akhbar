# Akhbar (أخبار) | UPSC Newspaper Companion for Arshi

**Akhbar** is a premium, distraction-free newspaper reading and note-taking application crafted specifically for UPSC Civil Services aspirant **Arshi**. Designed with a **Dark Academia + Minimal Productivity** aesthetic (Cream `#F8F4EC`, Deep Mahogany Brown `#4B3425`, Forest Green `#355E3B`, Gold Accent `#C89B3C`, and Charcoal typography).

---

## Key Features & Personalization

- **Personalized Header Greeting & Duas**: Displays *"As-salamu alaykum Arshi"* alongside a dynamic random Islamic Dua generator for her reading barakah and exam success on every reload.
- **Daily Newspaper Dashboard**: Dedicated cards for *The Hindu*, *Indian Express*, *The Times of India*, and *PIB/Editorial Summaries*.
- **PDF Reader & Custom Toolbar**: Built-in PDF viewer supporting page zoom, rotation, page jump, and dark academic reading mode.
- **Side-by-side Reader Sidebar**: Save page bookmarks, take page-specific notes, and view live GS Paper editorial summaries side-by-side while reading raw PDFs.
- **GS-Tagged Notes Repository**: Rich Markdown editor with UPSC answer templates (*Mains 250-word Outline*, *Prelims Fact Sheet*) tagged by GS1, GS2, GS3, GS4, Essay, and Prelims.
- **Monthly Archive Calendar**: Interactive calendar to browse and filter past newspapers by date and brand.
- **Pomodoro Study Timer**: UPSC-focused 25m/5m study clock with session tracking and celebratory confetti milestones.
- **Reading Streak & Progress Tracker**: Daily reading quota checklist ("Today's Newspaper Completed") and streak badges.

---

## 4 Free Ways to Sourcing Daily Newspapers

1. **In-App Drag & Drop PDF Uploader (Built-In)**
   * Click **"Upload PDF"** in the top navbar and upload today's newspaper PDF from your computer or phone.

2. **Automated Telegram Channel / Bot Sync**
   * Telegram channels publish daily e-papers (*The Hindu*, *Indian Express*) by 5:30 AM – 6:00 AM IST.
   * Run a free Python script (`Telethon`) on GitHub Actions or Render to automatically upload new channel PDFs to Supabase Storage.

3. **Automated GitHub Actions Cron Job**
   * Schedule a free GitHub Action at `06:00 AM IST` daily to fetch the latest e-paper PDF URL and insert a record into Supabase.

4. **Google Drive Shared Folder**
   * Drop PDFs in a shared Google Drive folder and paste the URL directly into Akhbar.

---

## Tech Stack

* **Frontend**: React 18 + Vite
* **Styling**: Tailwind CSS + Custom Dark Academia Palette & Typography (`Merriweather` + `Inter`)
* **Icons & Motion**: Lucide React + Framer Motion + Canvas Confetti
* **Database & Storage**: Supabase (Database + Storage) with LocalStorage fallback layer

---

## Getting Started

### 1. Installation

```bash
# Clone or open project directory
cd akhbar

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open `http://localhost:3000` in your browser.

---

## Supabase Database Setup

To connect a live cloud database:

1. Create a project at [supabase.com](https://supabase.com).
2. Go to the SQL Editor in Supabase and execute the script in `supabase/schema.sql`.
3. Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-supabase-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

4. Restart dev server (`npm run dev`).

---

## Deploying to Vercel

1. Push code to GitHub repository.
2. Import project into Vercel.
3. (Optional) Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Vercel Environment Variables.
4. Click **Deploy**.

---

*Made with love for Arshi. May Allah grant her top success in her UPSC journey!*
