# Use Case Diagram Generator

Minimal stateless application for generating use case diagrams via OpenAI.

## Prerequisites

- Python 3.10+
- Node.js 18+
- [Poetry](https://python-poetry.org/) for backend dependency management
- npm (comes with Node.js) for the frontend

## Backend setup

1. ``cd backend``
2. Create a ``.env`` file with your OpenAI key:

   ```bash
   echo "OPENAI_API_KEY=YOUR_KEY" > .env
   ```
3. Install the dependencies and run the server:

   ```bash
   poetry install
   poetry run uvicorn main:app --reload
   ```

   The API will be available at `http://localhost:8000`.

## Frontend setup

1. ``cd frontend``
2. Install JavaScript dependencies:

   ```bash
   npm install
   ```
3. Start the development server:

   ```bash
   npm run dev
   ```

   The application will open at `http://localhost:5173`.

Open the frontend in your browser, type your use-case description and press
**Generate**. The resulting diagram can be downloaded as XML or PNG.

The application uses React and Vite. Diagrams are rendered inside an iframe
via the diagrams.net embed script.

