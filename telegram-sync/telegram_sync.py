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
SOURCE_CHAT_ID = os.getenv('TELEGRAM_SOURCE_CHAT')  # Username, Phone, or Chat ID of your contact/channel

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Missing VITE_SUPABASE_URL or SUPABASE_KEY environment variables.")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def detect_brand(filename: str, caption: str) -> str:
    """Detects newspaper brand from file name or caption text."""
    combined = (filename + " " + caption).lower()
    if 'hindu' in combined:
        return 'The Hindu'
    elif 'express' in combined or 'ie' in combined:
        return 'The Indian Express'
    elif 'times' in combined or 'toi' in combined:
        return 'The Times of India'
    else:
        return 'The Hindu'  # Default fallback

async function_process_message(message):
    """Processes incoming Telegram message containing a PDF document."""
    if not message.media or not hasattr(message.media, 'document'):
        return

    doc = message.media.document
    mime_type = doc.mime_type or ''
    
    # Check if document is PDF
    if 'pdf' not in mime_type.lower():
        return

    caption = message.text or ''
    filename = ''
    for attr in doc.attributes:
        if hasattr(attr, 'file_name'):
            filename = attr.file_name
            break

    brand_name = detect_brand(filename, caption)
    today_date = datetime.date.today().isoformat()
    paper_id = f"np-{brand_name.lower().replace(' ', '')}-{today_date}"
    temp_filepath = f"temp_{brand_name.lower().replace(' ', '_')}_{today_date}.pdf"

    print(f"📥 Downloading PDF for {brand_name} ({today_date})...")
    await message.download_media(file=temp_filepath)

    # Storage bucket name
    bucket_name = "newspapers"
    storage_path = f"{today_date}/{brand_name.lower().replace(' ', '_')}.pdf"

    print(f"☁️ Uploading to Supabase Storage: {storage_path}...")
    with open(temp_filepath, 'rb') as f:
        file_bytes = f.read()
        try:
            # Upload file to Supabase storage
            supabase.storage.from_(bucket_name).upload(
                path=storage_path,
                file=file_bytes,
                file_options={"content-type": "application/pdf", "upsert": "true"}
            )
        except Exception as e:
            print(f"Storage upload note: {e}")

    # Get public URL
    public_url = f"{SUPABASE_URL}/storage/v1/object/public/{bucket_name}/{storage_path}"

    # Upsert newspaper record into Supabase database
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
        print(f"✅ SUCCESS! {brand_name} for {today_date} uploaded & available on Akhbar web app!")
    except Exception as e:
        print(f"❌ Database error: {e}")

    # Clean up local temporary file
    if os.path.exists(temp_filepath):
        os.remove(temp_filepath)

async def main():
    if not API_ID or not API_HASH:
        print("❌ Error: Missing TELEGRAM_API_ID or TELEGRAM_API_HASH in environment.")
        return

    client = TelegramClient(SESSION_NAME, int(API_ID), API_HASH)
    await client.start()
    print("🚀 Telegram Sync Client Started Successfully!")

    @client.on(events.NewMessage(chats=SOURCE_CHAT_ID if SOURCE_CHAT_ID else None))
    async def handler(event):
        print("📩 New Telegram message received!")
        await function_process_message(event.message)

    print("📡 Listening for daily newspaper PDFs from your Telegram contact...")
    await client.run_until_disconnected()

if __name__ == '__main__':
    asyncio.run(main())
