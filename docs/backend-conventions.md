# Backend Conventions

## ES Modules
- All backend code uses ES modules (`"type": "module"` in `backend/package.json`)
- Use `.js` extensions in imports: `from './routes/locations.js'`
- `import.meta.url` for `__dirname` equivalent

## Error Handling
- Centralized in `server.ts` - errors logged via pino, return 500 JSON
- Use `next(error)` to pass to error handler
- Custom error classes: `WeatherProviderError`, `DuplicateLocationError`

## Validation
- Coordinate bounds: Singapore only (lat 1.1-1.5, lon 103.6-104.1)
- Returns 422 for invalid coordinates
- Returns 409 for duplicate locations (unique index on lat/lon)

## Weather Client
- `SingaporeWeatherClient` in `weather.ts` wraps data.gov.sg API
- Implements `WeatherClient` interface for testability
- Mock in tests via `createApp({ weatherClient: mockClient })`

## Testing
- Vitest with supertest
- Isolated temp SQLite database per test run (`beforeAll` creates temp dir)
- Mock `WeatherClient` for deterministic results
- Run: `npm test` or `npm run test:watch`

## Key Files
- `server.ts` - Express app factory, Vite middleware, error handler
- `routes/locations.ts` - All location endpoints
- `db.ts` - SQLite connection, data access functions
- `weather.ts` - External API client
- `logger.ts` - Pino logger setup