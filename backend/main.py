import os
from fastapi import FastAPI, Depends
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pykakasi import kakasi
import deepl
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database import handler

load_dotenv()
handler.init_db() # Initialize DB and create table if it doesn't exist

auth_key = os.getenv("DEEPL_API_KEY")
app      = FastAPI()
origins  = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

deepl_client = deepl.DeepLClient(auth_key)

k = kakasi()
k.setMode("H", "a") # Hiragana to Ascii (Romaji)
k.setMode("K", "a") # Katakana to Ascii (Romaji)
k.setMode("J", "a") # Kanji to Ascii (Romaji)
conv = k.getConverter()

class TranslationRequest(BaseModel):
    text: str

class MessageRequest(BaseModel):
    name: str
    message: str

@app.post("/api/translate")
async def translate_text(request: TranslationRequest):
    """
    Endpoint to translate general text to Japanese and provide Romaji.
    """
    result = deepl_client.translate_text(request.text, target_lang="JA")
    romaji_text = conv.do(result.text)
    return {"translatedText": f"{result.text}", "romajiText": romaji_text}

@app.post("/api/name_translate")
async def translate_name(request: TranslationRequest):
    """
    Endpoint to translate names to Japanese and provide Romaji.
    """
    result = deepl_client.translate_text(request.text, target_lang="JA")
    romaji_name = conv.do(result.text)
    return {"translatedName": f"{result.text}", "romajiName": romaji_name}

@app.get("/api/messages")
async def get_all_messages(db: Session = Depends(handler.get_db)):
    """
    Endpoint to retrieve all messages.
    """
    messages = handler.get_messages(db, limit=20)
    return messages

@app.post("/api/messages")
async def create_new_message(request: MessageRequest, db: Session = Depends(handler.get_db)):
    """
    Endpoint to create a new message.
    """
    message = handler.create_message(db=db, name=request.name, message=request.message)
    return message

@app.get("/")
def read_root():
    return {"message": "Welcome to the Translation API"}