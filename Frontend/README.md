# Frontend — Meeting Management System

React + TypeScript client, styled with MUI.

## Setup

```
npm install
```

Create a `.env` file (see `.env.example`) with the backend API base URL:

```
VITE_API_BASE_URL="http://localhost:4000/api"
```

## Running

```
npm start
```

Opens automatically at `http://localhost:5173`.

## Building

```
npm run build
```

## Project structure

```
src/
├── assets/       ← hero illustration, static assets
├── components/   ← Header, Layout, MeetingCard, shared MeetingForm
├── models/       ← TypeScript interfaces mirroring backend documents
├── pages/        ← Home, About, Meetings, Add Meeting, Edit Meeting, Not Found
├── routes/       ← app-routes.tsx
├── services/     ← axios calls and business logic
└── utils/        ← AppConfig and date/time formatting helpers
```
