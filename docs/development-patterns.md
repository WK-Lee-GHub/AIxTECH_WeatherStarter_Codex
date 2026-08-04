# Development Patterns

## Adding a New API Endpoint

1. Add route handler in `backend/src/routes/locations.ts`
2. Add data access function in `backend/src/db.ts` if needed
3. Add TypeScript types in `frontend/src/types.ts`
4. Add API function in `frontend/src/api.ts`
5. Use in React components via `useStore()` hook

## Adding a New Weather Field

1. Update `WeatherSnapshot` interface in `backend/src/schema.ts`
2. Add column to `locations` table in schema
3. Run `npm run db:generate` and `npm run db:migrate`
4. Update `weatherToColumns`/`rowToRecord` in `db.ts`
5. Update `SingaporeWeatherClient` in `weather.ts` to fetch new field
6. Update frontend types and components

## Testing Workflow

- Backend tests: `backend/src/routes/locations.test.ts`
- Uses temp SQLite DB (created in `beforeAll`)
- Mocks `WeatherClient` for deterministic results
- Run: `npm test` (CI) or `npm run test:watch` (development)
- Test structure: `describe` → `beforeAll`/`beforeEach`/`afterAll` → `it` blocks

## Adding a New Frontend Component

1. Create component in `frontend/src/components/`
2. Import and use in `Layout.tsx` or relevant parent
3. Access state/actions via `useStore()` hook
4. Use shared types from `types.ts`
5. Style with Tailwind utilities

## Working with the Weather API

- External API: `https://api-open.data.gov.sg`
- Main endpoint: `GET /v2/real-time/api/two-hr-forecast`
- Client: `SingaporeWeatherClient` in `backend/src/weather.ts`
- Returns `WeatherSnapshot` with area forecasts and metadata
- Optional API key via `WEATHER_API_KEY` env var

## Database Operations

- Always use functions in `db.ts` - don't write raw SQL
- `createLocation` auto-refreshes weather after insert
- `updateWeather` updates all snapshot columns at once
- `resetStore()` for test cleanup
- Close connection with `closeDatabase()` on shutdown