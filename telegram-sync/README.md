# Telegram Daily Newspaper Auto-Sync for Akhbar

This automated Python script listens to incoming PDF newspapers sent by your Telegram contact/channel, uploads them to **Supabase Storage**, and syncs them automatically to **Akhbar**!

---

## ⚡ Step-by-Step Setup Guide (Takes 2 Minutes)

### Step 1: Get Telegram API Keys (Free)
1. Go to [my.telegram.org](https://my.telegram.org) and log in with your Telegram phone number.
2. Click **API Development Tools**.
3. Create a new app (App Title: `AkhbarSync`, Short Name: `akhbarsync`).
4. Copy your **`api_id`** and **`api_hash`**.

---

### Step 2: Configure Environment Variables

Create a file named `telegram-sync/.env` or set GitHub Repository Secrets:

```env
TELEGRAM_API_ID=12345678
TELEGRAM_API_HASH=your_telegram_api_hash_here
TELEGRAM_SOURCE_CHAT=your_contact_username_or_chat_id
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

---

### Step 3: Run Locally (Testing)

```bash
# Navigate to telegram-sync directory
cd telegram-sync

# Install requirements
pip install -r requirements.txt

# Run script
python telegram_sync.py
```

*On first run, Telegram will send a login code to your phone/app to verify session ownership.*

---

### Step 4: 100% Free Cloud Automation via GitHub Actions

When you push your repo to GitHub:
1. Go to GitHub Repo -> **Settings** -> **Secrets and variables** -> **Actions**.
2. Add secrets:
   * `TELEGRAM_API_ID`
   * `TELEGRAM_API_HASH`
   * `TELEGRAM_SESSION`
   * `TELEGRAM_SOURCE_CHAT`
   * `VITE_SUPABASE_URL`
   * `SUPABASE_SERVICE_ROLE_KEY`

Every morning at **06:00 AM IST**, GitHub Actions will automatically run the script, fetch today's papers from Telegram, and upload them to Akhbar!
