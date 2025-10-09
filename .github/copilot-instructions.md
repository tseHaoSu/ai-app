# Copilot Instructions for ai-app

## Project Overview

- **Monorepo structure**: Contains `client` (React + Vite + TailwindCSS) and `server` (Express, Bun) packages.
- **Client**: Modern React (v19), TypeScript, Vite, TailwindCSS. Entry: `src/App.tsx`. Uses `/api` proxy to backend.
- **Server**: Express app, entry: `index.ts`. Serves `/api/hello` endpoint. Uses Bun for runtime and scripts.

## Key Workflows

- **Install dependencies**:
   - At root: `bun install` (installs for all packages)
   - In package: `bun install` (client/server)
- **Run client**:
   - `cd packages/client && bun run dev` (starts Vite dev server)
- **Build client**:
   - `bun run build` (TypeScript + Vite build)
- **Run server**:
   - `cd packages/server && bun run dev` (auto-reloads with Bun)
- **Lint client**:
   - `bun run lint` (ESLint)

## Architecture & Patterns

- **API communication**: Client fetches from `/api/*`, proxied to Express server via Vite config.
- **Alias**: Use `@` for `src` in client imports (see `vite.config.ts`).
- **Styling**: TailwindCSS via Vite plugin. Edit `src/index.css`.
- **Environment**: Server loads `.env` via `dotenv`.
- **TypeScript**: Both client and server use TypeScript. Client has multiple tsconfig files for app/node.

## Conventions & Integration

- **No test setup**: No test scripts or frameworks detected.
- **No custom agent rules**: No `.github/copilot-instructions.md` or agent-specific rules found previously.
- **React patterns**: Use hooks (`useEffect`, `useState`). See `App.tsx` for API fetch example.
- **Server patterns**: Use Express route handlers. See `index.ts` for endpoint structure.
- **Proxy**: Vite dev server proxies `/api` to backend for local development.

## External Dependencies

- **Client**: React, ReactDOM, TailwindCSS, Vite, ESLint.
- **Server**: Express, dotenv, Bun.

## Example: Add API Endpoint

- Server: Add route in `server/index.ts`:
   ```ts
   app.get('/api/new', (req, res) => res.json({ message: 'New endpoint' }));
   ```
- Client: Fetch from `/api/new` in React component.

## Example: Use Alias in Client

- Import from `src` using alias:
   ```ts
   import MyComponent from '@/components/MyComponent';
   ```

---

If any section is unclear or missing, please provide feedback to improve these instructions.
