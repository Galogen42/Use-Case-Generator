"""FastAPI backend for generating use-case diagrams via OpenAI."""

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from dotenv import load_dotenv
import os
import openai

# Load variables from the local .env file so OPENAI_API_KEY is available
load_dotenv()

# Create the FastAPI application
app = FastAPI()


class DiagramRequest(BaseModel):
    """Data expected from the frontend when generating a diagram."""

    description: str


class DiagramResponse(BaseModel):
    """Data returned back to the frontend."""

    xml: str


@app.post("/generate-diagram", response_model=DiagramResponse)
async def generate_diagram(data: DiagramRequest) -> DiagramResponse:
    """Generate draw.io XML for the given description using ChatGPT."""

    # Read the API key on each request in case it changes while running
    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        raise HTTPException(status_code=500, detail="API key not configured")

    # Compose messages for the chat model
    messages = [
        {
            "role": "system",
            "content": "Ты — помощник, генерируешь draw.io XML для Use Case-диаграммы.",
        },
        {"role": "user", "content": data.description},
    ]

    try:
        # Ask OpenAI to generate the XML based on the description
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=messages,
            temperature=0,
        )
        xml = response["choices"][0]["message"]["content"].strip()
    except Exception as e:  # pragma: no cover - propagate OpenAI errors
        # Any exception during the API call results in an HTTP 500 error
        raise HTTPException(status_code=500, detail=str(e))

    # Send the generated XML back to the caller
    return {"xml": xml}


