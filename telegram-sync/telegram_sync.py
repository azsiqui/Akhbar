import os
import re
import datetime
import asyncio
import requests
from dotenv import load_dotenv
from telethon import TelegramClient
from telethon.sessions import StringSession
from supabase import create_client, Client

# Load environment variables
load_dotenv()

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
SESSION_STRING = os.getenv('TELEGRAM_SESSION', '')
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN', '')
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

def detect_brand(text: str):
    """
    Broad & flexible keyword matcher for daily newspaper PDFs:
    - Handles 'TOI ● Delhi Times ● 08-09-2026.pdf', 'IE-Delhi 08-09.pdf', 'TH- Delhi 08-09.pdf'
    """
    t = text.lower().replace('_', ' ').replace('-', ' ').replace('.', ' ').replace('●', ' ')

    # 1. The Hindu
    if 'hindu' in t or 'th delhi' in t or 'th dlhi' in t or t.startswith('th ') or ' th ' in t:
        return ('the-hindu', 'The Hindu')

    # 2. Indian Express
    if 'express' in t or 'ie delhi' in t or 'ie dlhi' in t or t.startswith('ie ') or ' ie ' in t:
        return ('indian-express', 'The Indian Express')

    # 3. The Times of India
    if 'toi' in t or 'times' in t:
        return ('toi', 'The Times of India')

    return None

async def process_telethon_message(message):
    """Processes document message using Telethon MTProto (Supports files up to 2GB, bypasses Bot 20MB limit)."""
    if not message or not message.media or not hasattr(message.media, 'document'):
        return False

    doc = message.media.document
    mime_type = getattr(doc, 'mime_type', '') or ''
    
    caption = message.text or ''
    filename = 'newspaper.pdf'
    if hasattr(doc, 'attributes'):
        for attr in doc.attributes:
            if hasattr(attr, 'file_name'):
                filename = attr.file_name
                break

    print(f"📄 Inspecting file: '{filename}' (Size: {round(doc.size / (1024*1024), 2)} MB, Caption: '{caption}')")

    target = detect_brand(filename + " " + caption)
    if not target:
        print(f"⏩ Skipped non-target file: '{filename}'")
        return False

    brand_slug, brand_name = target
    today_date = datetime.date.today().isoformat()
    paper_id = f"np-{brand_slug}-{today_date}"
    temp_filepath = f"temp_{brand_slug}_{today_date}.pdf"

    print(f"🎯 MATCH FOUND! Downloading '{filename}' ({brand_name}, {round(doc.size / (1024*1024), 2)} MB)...")
    try:
        await message.download_media(file=temp_filepath)
    except Exception as e:
        print(f"❌ Error downloading media via Telethon MTProto: {e}")
        return False

    bucket_name = "newspapers"
    storage_path = f"{today_date}/{brand_slug}.pdf"

    print(f"☁️ Uploading {brand_name} to Supabase Storage: {storage_path}...")
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
        print(f"✅ SUCCESS! {brand_name} ({round(doc.size / (1024*1024), 2)} MB) uploaded & live on Arshi's Desk!")
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)
        return True
    except Exception as e:
        print(f"❌ Database error: {e}")
        if os.path.exists(temp_filepath):
            os.remove(temp_filepath)
        return False

async def fetch_via_bot_updates(client):
    """
    Retrieves updates via HTTP Bot API to find recent message IDs and chat IDs,
    then uses Telethon MTProto client to fetch & download the full file (up to 2GB).
    This bypasses Telegram's 20MB HTTP Bot API getFile download restriction!
    """
    if not BOT_TOKEN:
        return

    print("🤖 Checking Bot HTTP updates for forwarded/sent files...")
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
    try:
        resp = requests.get(url, timeout=15).json()
    except Exception as e:
        print(f"Notice reaching Telegram API: {e}")
        return

    if not resp.get('ok'):
        return

    updates = resp.get('result', [])
    for update in updates:
        message = update.get('message') or update.get('channel_post') or {}
        doc = message.get('document')
        caption = message.get('caption', '') or message.get('text', '')
        chat = message.get('chat', {})
        chat_id = chat.get('id')
        msg_id = message.get('message_id')
        
        if doc and chat_id and msg_id:
            filename = doc.get('file_name', 'newspaper.pdf')
            target = detect_brand(filename + " " + caption)
            if target:
                print(f"📌 Found candidate message {msg_id} in chat {chat_id} for '{filename}'. Resolving via Telethon MTProto...")
                try:
                    telethon_msg = await client.get_messages(chat_id, ids=msg_id)
                    if telethon_msg:
                        await process_telethon_message(telethon_msg)
                except Exception as e:
                    print(f"Error fetching message {msg_id} via Telethon: {e}")

async def main():
    if not API_ID or not API_HASH:
        print("❌ Error: Missing TELEGRAM_API_ID or TELEGRAM_API_HASH.")
        return

    if SESSION_STRING:
        print("🔑 Logged in using TELEGRAM_SESSION StringSession (Full MTProto Engine - Supports files up to 2GB!).")
        client = TelegramClient(StringSession(SESSION_STRING), int(API_ID), API_HASH)
    else:
        print("🤖 Using TELEGRAM_BOT_TOKEN Bot Client...")
        client = TelegramClient('akhbar_session', int(API_ID), API_HASH)

    if BOT_TOKEN and not SESSION_STRING:
        await client.start(bot_token=BOT_TOKEN)
    else:
        await client.start()

    print("🚀 Telegram Sync Engine Started!")

    # 1. Try get_dialogs if available (user session)
    try:
        dialogs = await client.get_dialogs(limit=15)
        print(f"💬 Found {len(dialogs)} active Telegram chats.")
        for dialog in dialogs:
            print(f"🔍 Checking recent files in chat: '{dialog.name}'...")
            async for msg in client.iter_messages(dialog, limit=20):
                await process_telethon_message(msg)
    except Exception as e:
        print(f"Dialog enumeration notice (expected for bot tokens): {e}")

    # 2. Iterate through parsed_chats (e.g. English Newspapers, @arshi_desk_paper_bot, 'me')
    for chat_name in parsed_chats:
        try:
            print(f"🔍 Directly inspecting target chat/channel: '{chat_name}' via Telethon MTProto...")
            async for msg in client.iter_messages(chat_name, limit=25):
                await process_telethon_message(msg)
        except Exception as e:
            print(f"Notice inspecting '{chat_name}': {e}")

    # 3. Process any bot updates (bypasses 20MB HTTP Bot API limit by using Telethon MTProto to download)
    await fetch_via_bot_updates(client)

    print("✅ Newspaper Sync completed cleanly!")
    await client.disconnect()

if __name__ == '__main__':
    asyncio.run(main())
