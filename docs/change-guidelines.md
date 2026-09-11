# Change guidelines

- When adding a weather field, update `WeatherSnapshot`, `backend/src/schema.ts`, a Drizzle migration, database conversion functions, provider normalization, frontend types, UI, and tests together.
- Keep provider failure behavior partial and preserve the last good metric during refresh when possible.
- Keep API requests centralized in `frontend/src/api.ts` and server state in the store context.
- Do not commit `backend/weather.db`, SQLite `-wal`/`-shm` files, build output, or local environment files.
- For user-facing changes, manually exercise the affected UI/API flow in addition to automated checks.
