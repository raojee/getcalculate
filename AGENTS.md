# AGENTS.md

## Project Overview

An online calculator web application built with TanStack Start and deployed on Netlify. The UI is a single-page dark-themed calculator with keyboard support and a collapsible calculation history panel.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Directory Structure

```
public/               Static assets (favicon, images)
src/
  components/
    Calculator.tsx    All calculator logic + UI (useReducer state machine)
  routes/
    __root.tsx        Root HTML shell, meta tags, page title
    index.tsx         Home page — renders Calculator centered on dark background
  router.tsx          TanStack Router instantiation
  styles.css          Tailwind CSS 4 import + base styles
netlify.toml          Build config: vite build → dist/client, dev port 8888
vite.config.ts        Vite plugins: TanStack Start, Tailwind, Netlify
tsconfig.json         Strict TypeScript, @/* → src/* path alias
```

## Key Architecture Decisions

### Calculator state machine (`Calculator.tsx`)
- Uses `useReducer` with a single `State` type: `{ display, previousValue, operation, overwrite }`
- `overwrite: true` means the next digit press replaces the display (set after choosing an operation or completing an evaluation)
- History is local React state (`useState<HistoryEntry[]>`) — in-memory, resets on reload by design; no server persistence needed for a simple calculator
- Keyboard events are attached via `useEffect` on `window` with a `keydown` listener; cleanup removes the listener on unmount

### Display scaling
- `getDisplaySize()` picks a Tailwind text-size class based on formatted display length to prevent overflow at large digit counts

### Styling palette
- Dark palette: `#0e0e0e` page background, `#1a1a1a` calculator body, `#141414` display area
- `#ff9d2e` amber for operator and equals buttons
- Button variants: `number` (dark gray `#2a2a2a`), `fn` (medium gray `#3d3d3d`), `op`/`equals` (amber)

## Conventions

- Components: PascalCase files in `src/components/`
- Routes: file-based via TanStack Router in `src/routes/`
- TypeScript strict mode; use `type` keyword for type-only imports
- No external icon libraries — inline SVG for icons
- `@/` path alias maps to `src/`

## Development Commands

```bash
npm run dev      # Start dev server (port 3000, Netlify CLI proxy on 8888)
npm run build    # Production build to dist/client/
npm run preview  # Preview production build
```
