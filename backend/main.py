from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configure CORS to allow requests from your frontend
# Using ["*"] is convenient for development.
# For production, you should restrict this to your frontend's domain.
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslationRequest(BaseModel):
    text: str

@app.post("/api/translate")
async def translate_text(request: TranslationRequest):
    # TODO: Implement actual translation logic here
    # For now, we'll return a mock translation.
    print(f"Received text to translate: {request.text}")
    return {"translatedText": f"'{request.text}' translated to Japanese."}

@app.get("/")
def read_root():
    return {"message": "Welcome to the Translation API"}
