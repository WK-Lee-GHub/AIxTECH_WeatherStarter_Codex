# Weather Starter - Agent Instructions

A minimal TypeScript weather app for Singapore locations with Node/Express backend, React/Vite frontend, SQLite via Drizzle ORM, and Portless for stable `.localhost` URLs.

## Quick Start

```bash
npm install && npm run dev
# Opens http://weather-starter.localhost:1355
```

## Essential Commands

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server (Portless + tsx watch) |
| `npm run build` | Build frontend + compile backend TypeScript |
| `npm run start` | Run production server |
| `npm test` | Run backend API tests (vitest) |
| `npm run db:generate` | Generate Drizzle migrations after schema changes |
| `npm run db:migrate` | Apply Drizzle migrations |

## Project Structure

```
weather-starter/
├── backend/          # Express + Drizzle + SQLite
├── frontend/         # React + Vite + Tailwind
├── scripts/          # Dev/production scripts
├── package.json      # Root workspace (npm workspaces)
├── drizzle.config.ts
└── vitest.config.ts
```

## Key Conventions (see linked files)

- [Backend Conventions](docs/backend-conventions.md) - ES modules, error handling, validation, testing
- [Frontend Conventions](docs/frontend-conventions.md) - React Context state, API client, components, TypeScript
- [Database Conventions](docs/database-conventions.md) - Drizzle schema, migrations, JSON columns
- [Development Patterns](docs/development-patterns.md) - Adding endpoints, weather fields, testing workflows
- [Environment Variables](docs/environment-variables.md) - All config options with defaults
- [Common Pitfalls](docs/pitfalls.md) - Portless URL, ES modules, coordinate validation, etc.
- [API Reference](docs/api-reference.md) - Endpoints, data flow, request/response examples

## Architecture Overview

```
Browser → Portless proxy → Express + Vite middleware → SQLite (backend/weather.db)
                                              ↓
                                        data.gov.sg API
```

- Single Node process in dev: Express serves `/api/*`, Vite middleware serves React app
- Frontend uses relative `/api` requests (no port configuration needed)
- Snapshot pattern: weather fetched on create/refresh, stored locally, served from DB