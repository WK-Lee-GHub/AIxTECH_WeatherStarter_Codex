# Architecture and data flow

## Repository layout

- `backend/`: Node.js/TypeScript Express server, Drizzle ORM, SQLite persistence, provider client, and API tests.
- `frontend/`: React 18/Vite dashboard, Tailwind styling, Leaflet map, API client, and React context state.
- `scripts/`: development, production start, health check, and database reset helpers.
- `backend/drizzle/`: generated SQL migrations.

## Backend

`backend/src/server.ts` creates the Express app, installs JSON parsing and Pino request logging, exposes `/health` and `/api/logs`, mounts the locations router, and serves Vite middleware in development or `frontend/dist` in production.

`backend/src/routes/locations.ts` validates Singapore coordinates, handles duplicate locations, performs create/get/list/delete/refresh operations, and merges refresh results so failed provider metrics retain their previous values when possible.

`backend/src/weather.ts` adapts Singapore's `api-open.data.gov.sg` endpoints. It selects the nearest forecast area, weather station, and air-quality region, then normalizes forecast and metric responses into `WeatherSnapshot`.

`backend/src/db.ts` owns the SQLite connection, applies migrations, and exposes persistence helpers. `backend/src/schema.ts` defines the `locations` table and JSON forecast columns. `backend/src/logger.ts` provides the structured logger.

## Frontend

`frontend/src/main.tsx` is the entry point. `frontend/src/App.tsx` composes `StoreProvider` and `Layout`.

`frontend/src/api.ts` is the fetch boundary and uses relative `/api` URLs. `frontend/src/state/store.tsx` owns locations, selection, loading/error state, and create/refresh/delete actions. Dashboard components live under `frontend/src/components/` and should consume store hooks rather than making ad hoc requests.

## Request flow

Component -> store action -> `frontend/src/api.ts` -> Express route -> weather client/database -> JSON response -> store reload -> React re-render.

The backend stores the latest snapshot per saved coordinate; the frontend does not call the external weather provider directly.
