# Delhi Voice

**The City. The Culture. The Stories.** A heritage-editorial website concept for discovering Delhi's history, culture, people, events, food and neighbourhoods.

## What's included

- Responsive React + Vite frontend with editorial layout, mobile navigation, story cards, saved-story UI, place filters/search, events, newsletter form feedback and responsive states.
- FastAPI backend scaffold with SQLAlchemy models for articles, places and events; SQLite quick-start and PostgreSQL support through `DATABASE_URL`.
- API docs at `/docs`, health check at `/health`, public listing endpoints, and initial demo content-management endpoints.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

## Run the backend

```bash
cd backend
python -m venv .venv
# Windows: .venv\\Scripts\\activate
# macOS/Linux: source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`; interactive docs at `http://localhost:8000/docs`. By default, it uses a local SQLite database. To use PostgreSQL, set `DATABASE_URL` to a SQLAlchemy URL such as `postgresql+psycopg://USER:PASSWORD@HOST:5432/DBNAME` before starting the server.

## API endpoints

- `GET /api/articles?q=heritage` — published articles
- `GET /api/articles/{slug}` — published article detail
- `GET /api/places?q=Old%20Delhi` — place directory
- `GET /api/events` — published events
- `POST /api/admin/articles`, `PUT /api/admin/articles/{id}`, `DELETE /api/admin/articles/{id}` — article CRUD starter routes
- `POST /api/admin/places`, `POST /api/admin/events` — create place/event starter routes

## Important production checklist

This is a portfolio starter, not a production-ready deployment. The visual frontend currently uses illustrative/sample content and is not yet connected to the API. The newsletter currently shows local confirmation only. Before public deployment:

1. Add authentication and enforce Admin / Editor / Contributor permissions on every admin API route. **The `/api/admin/*` routes are currently unprotected and must not be exposed publicly.**
2. Add full CRUD and validation for events and places, migrations (Alembic), tests and audit logs.
3. Connect React pages to the API, implement loading/error states, and configure production CORS.
4. Add secure image uploads/storage, privacy/consent flows for newsletter signups, backups and deployment secrets.
5. Verify all event details, place information, image licensing/credits and external links. Event data shown in the demo is illustrative, not a verified live calendar.

## Design direction

- Ivory `#F5EBDD`, burgundy `#7B2435`, saffron `#D98B28`, ink `#282522`
- Playfair Display headlines + DM Sans body text
- Mobile-first responsive layouts and reduced-motion support

## Deploy the frontend to Vercel

The React/Vite frontend can be deployed as a static website on Vercel. The FastAPI backend is a separate service and is not deployed by this frontend configuration.

### Option A — GitHub + Vercel (recommended)

1. Extract this project ZIP on your computer.
2. Create a **public or private** repository on GitHub named `delhi-voice`.
3. Upload the contents of the extracted `delhi-voice` folder to the repository, keeping the `frontend` and `backend` folders at the repository root.
4. Open https://vercel.com/new and import that GitHub repository.
5. In Vercel project settings, set **Root Directory** to `frontend`.
6. Use these build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
7. Click **Deploy**. Vercel will provide a public `*.vercel.app` URL when the build succeeds.

The `frontend/vercel.json` file provides a fallback to `index.html` for client-side routes.

### Option B — Vercel CLI

Install Node.js LTS, extract the ZIP, open a terminal in the `delhi-voice/frontend` directory, and run:

```bash
npm install
npm run build
npx vercel
```

Follow the CLI prompts and use `npx vercel --prod` when ready to publish to production.

### Backend and security notes

- This setup deploys only the frontend. The FastAPI backend in `backend/` needs a separate Python-capable host and a production database if you want the API online.
- The frontend currently uses sample/demo content and is not connected to the backend API, so the visual site can be published without the backend.
- **Do not publish the backend as-is:** the `/api/admin/*` endpoints are currently unprotected. Add authentication/authorization before exposing those endpoints publicly.
- Do not commit `.env` files or secrets to GitHub. Configure production environment variables in the hosting provider's dashboard.
