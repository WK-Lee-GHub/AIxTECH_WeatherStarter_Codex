# API and data contracts

## Endpoints

- `GET /health`: process health check.
- `GET /api/locations`: list saved locations.
- `POST /api/locations`: validate and create a Singapore location, then attempt an initial weather refresh.
- `GET /api/locations/:id`: fetch one location.
- `DELETE /api/locations/:id`: delete one location.
- `POST /api/locations/:id/refresh`: refresh and persist weather for one location.

HTTP weather/location fields use snake_case. Backend Drizzle properties use camelCase internally and are converted at the database boundary.

## Snapshot model

`WeatherSnapshot` contains the current condition, observation metadata, temperature/humidity/rainfall, wind, UV, air quality, two-hour forecast periods, and daily forecast. The `locations` table stores one latest snapshot per coordinate; forecast arrays are JSON columns.

Creating a location persists coordinates with a placeholder snapshot, attempts a provider refresh, and returns the updated location when successful. A provider failure after creation still leaves the location saved. Manual refresh returns `502` for provider errors; partial metric failures preserve the previous value where supported.
