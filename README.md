# OdP Studio

A full-stack Next.js app that turns Spotify links into unique fragrance profiles.

## What it does

- Accepts Spotify URLs for `track`, `album`, `playlist`, or `artist`.
- Validates and parses the link in a backend API route.
- Generates a deterministic scent profile including:
  - fragrance name
  - concentration
  - top/heart/base notes
  - accords
  - longevity and sillage
  - mood and scent story

## Tech stack

- Next.js (App Router)
- React + TypeScript
- Route handlers for backend API
- Custom CSS styling

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## API

### `POST /api/fragrance`

Request body:

```json
{
  "spotifyLink": "https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl"
}
```

Success response:

```json
{
  "profile": {
    "fragranceName": "Nocturne 42",
    "resourceType": "track",
    "resourceId": "11dFghVXANMlKmJXsNCbNl",
    "concentration": "Eau de Parfum",
    "mood": "Late-night drive under city lights",
    "topNotes": ["Bergamot", "Yuzu", "Pink Pepper"],
    "heartNotes": ["Iris", "Black Tea", "Neroli"],
    "baseNotes": ["Sandalwood", "Musk", "Vetiver"],
    "accords": ["Citrus", "Woody", "Amber"],
    "sillage": "Moderate",
    "longevityHours": 8,
    "story": "Built from the rhythm..."
  }
}
```

Error responses:

- `400` for missing/invalid JSON body
- `422` for invalid Spotify links
