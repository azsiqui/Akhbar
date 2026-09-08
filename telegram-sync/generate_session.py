import os
import asyncio
from dotenv import load_dotenv
from telethon import TelegramClient
from telethon.sessions import StringSession

load_dotenv()

API_ID = os.getenv('TELEGRAM_API_ID') or input("Enter your TELEGRAM_API_ID: ")
API_HASH = os.getenv('TELEGRAM_API_HASH') or input("Enter your TELEGRAM_API_HASH: ")

async function_gen():
    async with TelegramClient(StringSession(), int(API_ID), API_HASH) as client:
        session_str = client.session.save()
        print("\n" + "="*50)
        print("✅ SUCCESS! Here is your TELEGRAM_SESSION string:")
        print("="*50)
        print(session_str)
        print("="*50)
        print("\nCopy the long string above and add it as GitHub Secret 'TELEGRAM_SESSION'!")

if __name__ == '__main__':
    asyncio.run(function_gen())
