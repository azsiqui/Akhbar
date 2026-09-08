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
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
SESSION_NAME = os.getenv('TELEGRAM_SESSION', 'akhbar_session')
SOURCE_CHAT_INPUT = os.getenv('TELEGRAM_SOURCE_CHAT', '')

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Missing VITE_SUPABASE_URL or SUPABASE_KEY environment variables.")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Parse multiple chats/channels
parsed_chats = []
if SOURCE_CHAT_INPUT:
    for item in SOURCE_CHAT_INPUT.split(','):
        cleaned = item.strip()
        if cleaned:
            if 'bot' in cleaned.lower() and not cleaned.startswith('@'):
                cleaned = '@' + cleaned
            parsed_chats.append(cleaned)

def detect_target_newspaper(filename: str, caption: str):
    """
    Broad & flexible keyword matcher for daily newspaper PDFs:
    - Matches The Hindu, Indian Express, and Times of India
    """
    text = (filename + " " + caption).lower().replace('_', ' ').replace('-', ' ').replace('.', ' ')

    # 1. The Hindu
    if 'hindu' in text or 'th delhi' in text or 'th dlhi' in text or text.startswith('th ') or ' th ' in text:
        return ('the-hindu', 'The Hindu')

    # 2. Indian Express
    if 'express' in text or 'ie delhi' in text or 'ie dlhi' in text or text.startswith('ie ') or ' ie ' in text:
        return ('indian-express', 'The Indian Express')

    # 3. The Times of India
    if 'toi' in text or 'times' in text:
        return ('toi', 'The Times of India')

    return None

async def process_message(message):
    """Processes Telegram message containing a PDF document."""
    if not message or not message.media or not hasattr(message.media, 'document'):
        return False

    doc = message.media.document
    mime_type = doc.mime_type or ''
    
    caption = message.text or ''
    filename = 'unnamed.pdf'
    for attr in doc.attributes:
        if hasattr(attr, 'file_name'):
            filename = attr.file_name
            break

    print(f"📄 Inspecting file: '{filename}' (Mime: '{mime_type}', Caption: '{caption}')")

    target = detect_target_newspaper(filename, caption)
    if not target:
        print(f"⏩ Skipped non-target file: '{filename}'")
        return False

    brand_slug, brand_name = target
    today_date = datetime.date.today().isoformat()
    paper_id = f"np-{brand_slug}-{today_date}"
    temp_filepath = f"temp_{brand_slug}_{today_date}.pdf"

    print(f"🎯 MATCH FOUND! Processing '{filename}' as {brand_name} ({today_date})...")
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

    print(f"💾 Saving paper record to Supabase database table...")
    try:
        supabase.table("newspapers").upsert(record).execute()
        print(f"✅ SUCCESS! {brand_name} uploaded & live on Arshi's Desk!")
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)
        return False

async def main():
    if not API_ID or not API_HASH:
        print("❌ Error: Missing TELEGRAM_API_ID or TELEGRAM_API_HASH in environment.")
        return

    client = TelegramClient(SESSION_NAME, int(API_ID), API_HASH)
    
    if BOT_TOKEN:
        print("🤖 Logging in using TELEGRAM_BOT_TOKEN...")
        await client.start(bot_token=BOT_TOKEN)
    else:
        print("📱 Starting Telegram client...")
        await client.start()

    print("🚀 Telegram Sync active!")

    # Inspect messages across dialogs/chats
    dialogs = await client.get_dialogs(limit=10)
    print(f"💬 Found {len(dialogs)} active chats/dialogs on Telegram.")

    for dialog in dialogs:
        print(f"🔍 Inspecting chat: '{dialog.name}' (ID: {dialog.id})...")
        try:
            async for msg in client.iter_messages(dialog, limit=15):
                await process_message(msg)
        except Exception as e:
            print(f"Notice reading {dialog.name}: {e}")

    print("✅ Sync check completed cleanly!")
    await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
