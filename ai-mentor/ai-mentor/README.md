# AI Mentor — Smart Learning & Career Companion

This is a runnable scaffold for a full-stack AI Mentor app (React + Vite + Tailwind on the frontend, Node + Express + MongoDB on the backend) with OpenAI integration points.

## Quick start

### Backend
```bash
cd backend
npm install
cp ../.env.example .env  # fill in OPENAI_API_KEY and MONGODB_URI
node server.js
```

### Frontend
```bash
cd ../frontend
npm install
npm run dev
# open http://localhost:5173
```

### Environment
Create `.env` in `backend/` using `.env.example`:
```
MONGODB_URI=mongodb+srv://<user>:<pw>@cluster0.mongodb.net/ai_mentor
OPENAI_API_KEY=sk-REPLACE_ME
PORT=4000
```
