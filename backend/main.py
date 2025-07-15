from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai

load_dotenv()

app = FastAPI()

class DiagramRequest(BaseModel):
    description: str

class DiagramResponse(BaseModel):
    xml: str

@app.post("/generate-diagram", response_model=DiagramResponse)
async def generate_diagram(data: DiagramRequest):
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise HTTPException(status_code=500, detail="API key not configured")

    messages = [
        {"role": "system", "content": "Ты — помощник, генерируешь draw.io XML для Use Case-диаграммы."},
        {"role": "user", "content": data.description},
    ]

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0,
        )
        xml = response["choices"][0]["message"]["content"].strip()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

    return {"xml": xml}

