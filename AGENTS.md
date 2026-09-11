# AGENTS.md

Weather Starter is a TypeScript npm-workspace monorepo for a Singapore weather dashboard with an Express/SQLite backend and React/Vite frontend.

## Repository-wide checks

Run these from the repository root after dependencies are installed:

```bash
npm run build   # frontend production build plus backend TypeScript compilation
npm test        # backend Vitest suite
```

There is currently no configured lint command. Do not assume `npm run lint` exists; if linting is added, update the root scripts and the relevant documentation.

## Task-specific guidance

- [Architecture and data flow](docs/architecture.md)
- [Development and environment](docs/development.md)
- [Testing](docs/testing.md)
- [API and data contracts](docs/api-and-data.md)
- [Change guidelines](docs/change-guidelines.md)
