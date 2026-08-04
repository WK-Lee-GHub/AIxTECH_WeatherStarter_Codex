# Common Pitfalls

## 1. Portless URL
**Issue**: Using `localhost:3000` instead of Portless URL in development
**Fix**: Always use `http://weather-starter.localhost:1355` in dev

## 2. Database Path
**Issue**: `DATABASE_PATH` resolves relative to `process.cwd()`
**Fix**: Run all commands from repo root (`weather-starter/`)

## 3. ES Module Imports
**Issue**: Backend requires `.js` extensions in imports
**Fix**: Use `from './routes/locations.js'` not `from './routes/locations'`

## 4. Coordinate Validation
**Issue**: Backend rejects coordinates outside Singapore bounds
**Fix**: Ensure lat 1.1-1.5, lon 103.6-104.1 for all locations

## 5. Duplicate Locations
**Issue**: Unique constraint on (latitude, longitude) returns 409
**Fix**: Check if location exists before creating, or handle 409 response

## 6. Frontend API Base
**Issue**: Frontend uses relative `/api` - only works with Vite middleware proxy
**Fix**: In production, Express serves static files and API from same origin

## 7. Weather Snapshot Pattern
**Issue**: Weather not real-time on every page load
**Fix**: Only fetched on create/refresh - call `/refresh` for latest data

## 8. Test Database
**Issue**: Tests use temp database - don't affect main `backend/weather.db`
**Fix**: Tests set `DATABASE_PATH` to temp dir in `beforeAll`

## 9. HTTPS for Geolocation
**Issue**: Browser geolocation API requires HTTPS
**Fix**: Set `PORTLESS_HTTPS=1` (requires certificate trust prompt)

## 10. TypeScript Strict Mode
**Issue**: Frontend and backend both use strict TypeScript
**Fix**: All types must be explicit - no `any`, handle null/undefined