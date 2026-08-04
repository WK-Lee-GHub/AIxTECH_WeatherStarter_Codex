# API Reference

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/api/locations` | List all locations |
| POST | `/api/locations` | Create location |
| GET | `/api/locations/:id` | Get single location |
| POST | `/api/locations/:id/refresh` | Refresh weather for location |
| DELETE | `/api/locations/:id` | Delete location |
| POST | `/api/logs` | Frontend interaction logging |

## Request/Response Examples

### GET /health
```json
// Response 200
{ "status": "healthy" }
```

### GET /api/locations
```json
// Response 200
{
  "locations": [
    {
      "id": 1,
      "latitude": 1.35,
      "longitude": 103.85,
      "created_at": "2026-01-15T10:30:00",
      "weather": { ...WeatherSnapshot }
    }
  ]
}
```

### POST /api/locations
```json
// Request
{ "latitude": 1.35, "longitude": 103.85 }

// Response 201
{
  "id": 1,
  "latitude": 1.35,
  "longitude": 103.85,
  "created_at": "2026-01-15T10:30:00",
  "weather": { ...WeatherSnapshot }
}

// Error 422
{ "detail": "Coordinates must be within Singapore (lat 1.1-1.5, lon 103.6-104.1)" }

// Error 409
{ "detail": "Location already exists" }
```

### GET /api/locations/:id
```json
// Response 200
{
  "id": 1,
  "latitude": 1.35,
  "longitude": 103.85,
  "created_at": "2026-01-15T10:30:00",
  "weather": { ...WeatherSnapshot }
}

// Error 404
{ "detail": "Location not found" }
```

### POST /api/locations/:id/refresh
```json
// Response 200
{
  "id": 1,
  "latitude": 1.35,
  "longitude": 103.85,
  "created_at": "2026-01-15T10:30:00",
  "weather": { ...WeatherSnapshot }
}

// Error 404
{ "detail": "Location not found" }

// Error 502
{ "detail": "Weather provider error message" }
```

### DELETE /api/locations/:id
```json
// Response 204 (no content)

// Error 404
{ "detail": "Location not found" }
```

### POST /api/logs
```json
// Request
{
  "event": "location_create_submitted",
  "metadata": { "latitude": 1.35, "longitude": 103.85 },
  "page": "/"
}

// Response 204 (no content)

// Error 422
{ "detail": "event is required" }
```

## WeatherSnapshot Structure

```typescript
interface WeatherSnapshot {
  condition: string | null;           // e.g., "Cloudy", "Rain"
  observed_at: string | null;         // ISO timestamp
  source: string | null;              // e.g., "data.gov.sg"
  area: string | null;                // Forecast area name
  valid_period_text: string | null;   // Human-readable period
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

## Data Flow

1. **Create**: POST `/api/locations` → saves to DB with default weather → calls data.gov.sg → updates DB → returns updated location
2. **List**: GET `/api/locations` → reads from SQLite via Drizzle
3. **Refresh**: POST `/api/locations/:id/refresh` → calls data.gov.sg → updates DB → returns updated location
4. **Delete**: DELETE `/api/locations/:id` → removes from DB

## External API

- Base: `https://api-open.data.gov.sg`
- Primary: `GET /v2/real-time/api/two-hr-forecast`
- Optional API key: `WEATHER_API_KEY` env var
- No auth required for basic usage (rate limits apply)