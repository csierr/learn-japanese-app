import os
from unittest import result
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from pykakasi import kakasi
import deepl
from dotenv import load_dotenv
load_dotenv()

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

@app.post("/api/translate")
async def translate_text(request: TranslationRequest):
    result = deepl_client.translate_text(request.text, target_lang="JA")
    romaji_text = conv.do(result.text)
    return {"translatedText": f"{result.text}", "romajiText": romaji_text}

@app.post("/api/name_translate")
async def translate_name(request: TranslationRequest):
    result = deepl_client.translate_text(request.text, target_lang="JA")
    romaji_name = conv.do(result.text)
    return {"translatedName": f"{result.text}", "romajiName": romaji_name}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Translation API"}
