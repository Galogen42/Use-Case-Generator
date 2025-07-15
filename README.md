# Use Case Diagram Generator

Minimal stateless application for generating use case diagrams via OpenAI.

## Backend

```bash
cd backend
poetry install
poetry run uvicorn main:app --reload
```

Environment variables are stored in `.env` (set `OPENAI_API_KEY`).

## Frontend

```bash
cd frontend
npm install
npm run dev
```

The application uses React and Vite. The diagram is rendered inside an iframe
using the diagrams.net embed script.

