# Environment Variables

| Variable | Purpose | Default | Required |
|----------|---------|---------|----------|
| `PORT` | Backend port | 3000 | No |
| `DATABASE_PATH` | SQLite file path | `./backend/weather.db` | No |
| `WEATHER_API_KEY` | Optional data.gov.sg API key | - | No |
| `PORTLESS_PORT` | Portless proxy port | 1355 | No |
| `PORTLESS_HTTPS` | Enable HTTPS for Portless | 0 | No |
| `LOG_LEVEL` | Pino log level | info | No |
| `NODE_ENV` | Environment | development | No |

## Usage

```bash
# Development (uses defaults)
npm run dev

# With custom API key
WEATHER_API_KEY=your_key npm run dev

# Production
NODE_ENV=production npm run start

# Custom database location
DATABASE_PATH=/data/weather.db npm run dev
```

## Notes

- `DATABASE_PATH` uses `process.cwd()` - run commands from repo root
- `PORTLESS_HTTPS=1` enables HTTPS for geolocation API (requires cert trust)
- `LOG_LEVEL=silent` used in tests to suppress output
- All variables optional - app works with defaults