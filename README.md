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

## Running on Windows with VS Code

1. [Install Node.js](https://nodejs.org/) (which includes `npm`). During the
   setup ensure that the option to add Node to your `PATH` is enabled.
2. Restart VS Code after installation so the terminal can find the `npm` command.
3. Open the project folder in VS Code and launch a new terminal
   (``Ctrl+` `` by default).
4. Verify the tools are available:

   ```powershell
   node --version
   npm --version
   ```

5. Follow the **Backend setup** steps above using PowerShell.
6. For the frontend:

   ```powershell
   cd frontend
   npm install     # installs dependencies
   npm run dev     # starts the Vite dev server
   ```

   The application will open at `http://localhost:5173`.
