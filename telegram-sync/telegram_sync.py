import os
import re
import datetime
import asyncio
from dotenv import load_dotenv
from telethon import TelegramClient, events
from supabase import create_client, Client

# Load environment variables
load_dotenv()

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
SESSION_NAME = os.getenv('TELEGRAM_SESSION', 'akhbar_session')
SOURCE_CHAT_ID = os.getenv('TELEGRAM_SOURCE_CHAT')  # Username, Chat ID, Channel, or Bot Chat

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Missing VITE_SUPABASE_URL or SUPABASE_KEY environment variables.")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def detect_target_newspaper(filename: str, caption: str):
    """
    Exact keyword matcher for user's specific daily file names:
    - 'TH delhi' -> The Hindu Delhi
    - 'toi delhi' -> The Times of India Delhi
    - 'IE dlhi' / 'IE delhi' -> The Indian Express Delhi
    """
    text = (filename + " " + caption).lower().replace('_', ' ').replace('-', ' ')

    # 1. The Hindu Delhi ('th delhi' or 'hindu delhi')
    if ('th' in text or 'hindu' in text) and ('delhi' in text or 'dlhi' in text or 'national' in text):
        return ('the-hindu', 'The Hindu')

    # 2. Indian Express Delhi ('ie dlhi' or 'ie delhi' or 'express delhi')
    if ('ie' in text or 'express' in text) and ('dlhi' in text or 'delhi' in text):
        return ('indian-express', 'The Indian Express')

    # 3. The Times of India Delhi ('toi delhi' or 'times delhi')
    if ('toi' in text or 'times' in text) and ('delhi' in text or 'dlhi' in text):
        return ('toi', 'The Times of India')

    return None

async def process_message(message):
    """Processes incoming/forwarded Telegram message containing a PDF document."""
    if not message.media or not hasattr(message.media, 'document'):
        return

    doc = message.media.document
    mime_type = doc.mime_type or ''
    
    if 'pdf' not in mime_type.lower():
        return

    caption = message.text or ''
    filename = ''
    for attr in doc.attributes:
        if hasattr(attr, 'file_name'):
            filename = attr.file_name
            break

    target = detect_target_newspaper(filename, caption)
    if not target:
        print(f"⏩ Skipped file: '{filename}' (Not TH delhi, TOI delhi, or IE dlhi)")
        return

    brand_slug, brand_name = target
    today_date = datetime.date.today().isoformat()
    paper_id = f"np-{brand_slug}-{today_date}"
    temp_filepath = f"temp_{brand_slug}_{today_date}.pdf"

    print(f"🎯 Matched: {filename} -> {brand_name} ({today_date})")
    await message.download_media(file=temp_filepath)

    bucket_name = "newspapers"
    storage_path = f"{today_date}/{brand_slug}.pdf"

    print(f"☁️ Uploading to Supabase Storage: {storage_path}...")
    with open(temp_filepath, 'rb') as f:
        file_bytes = f.read()
        try:
            supabase.storage.from_(bucket_name).upload(
                path=storage_path,
                file=file_bytes,
                file_options={"content-type": "application/pdf", "upsert": "true"}
            )
        except Exception as e:
            print(f"Storage upload note: {e}")

    public_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket_name}/{storage_path}"

    record = {
        "id": paper_id,
        "date": today_date,
        "title": brand_name,
        "source": brand_name,
        "pdf_url": public_url,
        "completed": False,
        "created_at": datetime.datetime.utcnow().isoformat()
    }

    print(f"💾 Saving paper record to Supabase database...")
    try:
        supabase.table("newspapers").upsert(record).execute()
        print(f"✅ SUCCESS! {brand_name} uploaded & live on Arshi's Desk!")
    except Exception as e:
        print(f"❌ Database error: {e}")

    if os.path.exists(temp_filepath):
        os.remove(temp_filepath)

async def main():
    if not API_ID or not API_HASH:
        print("❌ Error: Missing TELEGRAM_API_ID or TELEGRAM_API_HASH in environment.")
        return

    client = TelegramClient(SESSION_NAME, int(API_ID), API_HASH)
    await client.start()
    print("🚀 Telegram Sync Started!")

    @client.on(events.NewMessage(chats=SOURCE_CHAT_ID if SOURCE_CHAT_ID else None))
    async def handler(event):
        print("📩 New Telegram message received!")
        await process_message(event.message)

    print("📡 Monitoring chat/channel for TH delhi, TOI delhi, and IE dlhi...")
    await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
