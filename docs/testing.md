# Testing

Run the suite with:

```bash
npm test
npm run test:watch
```

Vitest is configured in `vitest.config.ts` to run `backend/src/**/*.test.ts` in a Node environment with test logging disabled and file parallelism disabled.

`backend/src/routes/locations.test.ts` uses a temporary SQLite database and an injected fake `WeatherClient` to test API behavior. `backend/src/weather.test.ts` mocks `fetch` and tests provider-payload normalization without live network calls.

When changing routes, persistence, or provider parsing:

- Add or update backend tests for the behavior and failure cases.
- Prefer injected weather clients and mocked payloads over external API calls.
- Run `npm test` and `npm run build` before handoff.
