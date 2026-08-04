# Frontend Conventions

## State Management
- React Context in `state/store.tsx` - single source of truth
- `StoreProvider` wraps app, exposes `useStore()` hook
- State: `locations`, `selectedId`, `isAdding`, `isLoading`, `refreshingId`, `error`
- Actions: `create`, `refresh`, `deleteLocation`, `select`, `setAdding`
- Derived: `useSelectedLocation()` hook returns selected location object

## API Client
- All API calls in `api.ts` - thin fetch wrappers
- `request<T>(endpoint, options)` handles JSON, errors, 204 responses
- Functions: `listLocations()`, `createLocation(payload)`, `refreshLocation(id)`, `deleteLocation(id)`
- Relative `/api` base - works via Vite middleware proxy in dev
- Frontend logging: `logInteraction(event, metadata)` posts to `/api/logs`

## Components
- Functional components with hooks
- Tailwind CSS for styling (utility-first)
- Component structure:
  - `Layout.tsx` - Root layout (Sidebar + Hero)
  - `Sidebar.tsx` - Location list, search, AddLocationForm
  - `SidebarCard.tsx` - Individual card (select/delete)
  - `AddLocationForm.tsx` - Lat/lon input form
  - `Hero.tsx` - Main weather display
  - `HourlyStrip.tsx`, `TenDayForecast.tsx`, `Tiles.tsx` - Weather details
  - `ThemeSelector.tsx` - Theme switching
  - `icons.tsx` - SVG icons
  - `format.ts` - Temperature/time formatting utilities

## TypeScript
- Strict mode enabled in `tsconfig.json`
- Shared types in `types.ts`: `Location`, `WeatherSnapshot`, `CreateLocationPayload`, etc.
- `WeatherSnapshot` mirrors backend schema exactly

## Key Files
- `state/store.tsx` - Context, hooks, all state/actions
- `api.ts` - API client functions
- `types.ts` - Shared TypeScript interfaces
- `components/` - All UI components