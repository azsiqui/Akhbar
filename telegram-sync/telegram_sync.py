import os
import re
import datetime
import requests
from dotenv import load_dotenv
from supabase import create_client, Client

# Load environment variables
load_dotenv()

API_ID = os.getenv('TELEGRAM_API_ID')
API_HASH = os.getenv('TELEGRAM_API_HASH')
BOT_TOKEN = os.getenv('TELEGRAM_BOT_TOKEN')
SUPABASE_URL = os.getenv('VITE_SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Error: Missing VITE_SUPABASE_URL or SUPABASE_KEY environment variables.")
    exit(1)

# Initialize Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

def detect_brand(text: str):
    """
    Broad & flexible keyword matcher for daily newspaper PDFs:
    - Matches The Hindu, Indian Express, and Times of India
    """
    t = text.lower().replace('_', ' ').replace('-', ' ').replace('.', ' ')

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

def run_bot_sync():
    """Official Telegram Bot API sync via getUpdates endpoint."""
    today_date = datetime.date.today().isoformat()

    if not BOT_TOKEN:
        print("❌ Error: TELEGRAM_BOT_TOKEN environment variable is missing.")
        return

    print(f"🤖 Connected to Telegram Bot API (Token: {BOT_TOKEN[:10]}...)...")
    url = f"https://api.telegram.org/bot{BOT_TOKEN}/getUpdates"
    
    try:
        resp = requests.get(url, timeout=15).json()
    except Exception as e:
        print(f"❌ Failed to reach Telegram API: {e}")
        return

    if not resp.get('ok'):
        print(f"❌ Telegram API Response Error: {resp}")
        return

    updates = resp.get('result', [])
    print(f"📥 Found {len(updates)} recent updates in Bot memory.")

    uploaded_count = 0

    for update in updates:
        message = update.get('message') or update.get('channel_post') or update.get('edited_message') or {}
        doc = message.get('document')
        caption = message.get('caption', '') or message.get('text', '')
        
        if doc:
            filename = doc.get('file_name', 'newspaper.pdf')
            mime_type = doc.get('mime_type', '')
            print(f"📄 Inspecting document: '{filename}' (Caption: '{caption}')")

            target = detect_brand(filename + " " + caption)
            if target:
                brand_slug, brand_name = target
                file_id = doc.get('file_id')
                
                print(f"🎯 MATCH FOUND! Getting download link for '{filename}' ({brand_name})...")
                file_info_url = f"https://api.telegram.org/bot{BOT_TOKEN}/getFile?file_id={file_id}"
                file_info_resp = requests.get(file_info_url).json()

                if file_info_resp.get('ok'):
                    file_path = file_info_resp['result']['file_path']
                    download_url = f"https://api.telegram.org/file/bot{BOT_TOKEN}/{file_path}"
                    
                    print(f"⬇️ Downloading PDF from Telegram...")
                    pdf_bytes = requests.get(download_url).content

                    storage_path = f"{today_date}/{brand_slug}.pdf"
                    print(f"☁️ Uploading to Supabase Storage: {storage_path}...")
                    
                    try:
                        supabase.storage.from_("newspapers").upload(
                            path=storage_path,
                            file=pdf_bytes,
                            file_options={"content-type": "application/pdf", "upsert": "true"}
                        )
                    except Exception as e:
                        print(f"Storage note: {e}")

                    public_url = f"{SUPABASE_URL}/storage/v1/object/public/newspapers/{storage_path}"

                    paper_record = {
                        "id": f"np-{brand_slug}-{today_date}",
                        "date": today_date,
                        "title": brand_name,
                        "source": brand_name,
                        "pdf_url": public_url,
                        "completed": False,
                        "created_at": datetime.datetime.utcnow().isoformat()
                    }

                    try:
                        supabase.table("newspapers").upsert(paper_record).execute()
                        print(f"✅ SUCCESS! {brand_name} ({today_date}) uploaded & live on Arshi's Desk!")
                        uploaded_count += 1
                    except Exception as e:
                        print(f"Database error: {e}")

    print(f"🎉 Bot Sync execution completed! Total newspapers uploaded today: {uploaded_count}")

if __name__ == '__main__':
    run_bot_sync()
