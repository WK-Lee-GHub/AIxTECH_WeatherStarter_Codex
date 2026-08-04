# Database Conventions

## Schema
- Defined in `backend/src/schema.ts` using Drizzle ORM
- Single table: `locations` with weather snapshot columns
- Unique index on `(latitude, longitude)` prevents duplicates
- JSON columns: `forecastPeriods`, `dailyForecast` stored as JSON text

## WeatherSnapshot Interface
```typescript
interface WeatherSnapshot {
  condition: string | null;
  observed_at: string | null;
  source: string | null;
  area: string | null;
  valid_period_text: string | null;
  temperature_c: number | null;
  humidity_percent: number | null;
  rainfall_mm: number | null;
  wind_speed_knots: number | null;
  wind_direction_degrees: number | null;
  forecast_low_c: number | null;
  forecast_high_c: number | null;
  uv_index: number | null;
  psi_twenty_four_hourly: number | null;
  pm25_one_hourly: number | null;
  air_quality_region: string | null;
  forecast_periods: Array<{ label: string; forecast: string }>;
  daily_forecast: Array<{ date: string; forecast: string; temperature_low_c: number | null; temperature_high_c: number | null }>;
}
```

## Migrations
- Generated to `backend/drizzle/` via `npm run db:generate`
- Applied via `npm run db:migrate`
- Config in `drizzle.config.ts` (SQLite dialect)

## Data Access (db.ts)
- `listLocations()` - all locations, ordered by createdAt desc
- `createLocation(lat, lon)` - inserts with default weather, returns record
- `getLocation(id)` - single location by ID
- `updateWeather(id, weather)` - updates weather snapshot columns
- `deleteLocation(id)` - deletes location
- `resetStore()` - clears all locations (used in tests)
- `closeDatabase()` - closes SQLite connection

## Conversion Helpers
- `weatherToColumns(weather)` - WeatherSnapshot → DB columns
- `rowToRecord(row)` - DB row → LocationRecord with WeatherSnapshot

## Default Weather
New locations get placeholder weather:
```typescript
const defaultWeather: WeatherSnapshot = {
  condition: 'Not refreshed',
  observed_at: null,
  source: 'not-refreshed',
  // ... all other fields null/empty
};
```