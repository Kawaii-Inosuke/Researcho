# Researcho - IEEE Paper Writer

AI-powered research paper generator that creates IEEE-style academic papers using Google's Gemini API and OpenAlex research database.

## Features

- 🤖 Multi-agent AI pipeline for paper generation
- 📚 Automatic research paper discovery via OpenAlex
- 📝 IEEE-style formatting and citations
- ✨ Beautiful, modern React frontend
- 🚀 Fast and free (no API keys needed for research)

## Tech Stack

**Backend:**
- Node.js + Express
- Google Gemini 2.5 Flash API
- OpenAlex API
- Multi-agent architecture

**Frontend:**
- React + Vite
- Vanilla CSS with glassmorphism design
- Axios for API calls

## Setup

### Backend

1. Navigate to backend directory:
```bash
cd ieee-paper-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start server:
```bash
node server.js
```

Server runs on `http://localhost:5000`

### Frontend

1. Navigate to frontend directory:
```bash
cd ieee-paper-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start dev server:
```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

## Usage

1. Open `http://localhost:5173` in your browser
2. Enter your research topic
3. Add relevant keywords
4. Click "Generate Paper"
5. Wait for the AI to generate your IEEE-style paper with citations

## Architecture

The application uses a multi-agent pipeline:

1. **Drafting Agent** - Generates initial paper sections
2. **Research Agent** - Fetches related papers from OpenAlex
3. **Citation Agent** - Formats references in IEEE style
4. **Formatting Agent** - Improves academic tone
5. **Editing Agent** - Polishes final output

## API Keys

- **Gemini API**: Get your free API key at [Google AI Studio](https://aistudio.google.com/app/apikey)
- **OpenAlex**: No API key required!

## License

MIT

## Contributing

Contributions welcome! Please open an issue or submit a pull request.
