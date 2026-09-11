# Development and environment

## Commands

```bash
npm install
npm run dev
npm run start
npm run doctor
npm run reset
npm run db:generate
npm run db:migrate
```

- `npm run dev` starts `tsx watch backend/src/server.ts` through Portless and Vite at `http://weather-starter.localhost:1355` by default.
- `npm run start` runs the compiled production server; run `npm run build` first.
- `npm run doctor` checks `/health` and `/api/locations`. It defaults to `http://127.0.0.1:3000`; set `WEATHER_STARTER_URL` when using another URL.
- `npm run reset` removes the configured SQLite database and its `-wal`/`-shm` sidecars.
- Generate and apply a Drizzle migration after schema changes.

Workspace-specific scripts are available with `npm run <script> -w frontend` or `npm run <script> -w backend`.

## Environment

Copy `.env.example` to `.env`, or export variables in the shell:

- `WEATHER_API_KEY`: optional data.gov.sg key for higher rate limits.
- `PORTLESS_PORT`: Portless proxy port; default `1355`.
- `PORTLESS_HTTPS`: set to `1` when browser features require HTTPS.
- `DATABASE_PATH`: SQLite path; default `backend/weather.db`.
- `PORT`: direct backend port when not using Portless.

The frontend also provides `.env.local.example` for optional Vite API-target settings, though the normal setup uses same-origin relative API requests.
