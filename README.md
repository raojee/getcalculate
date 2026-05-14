# Calculator — Free Online Tool

A fast, keyboard-friendly online calculator built with TanStack Start and deployed on Netlify.

## Features

- Standard arithmetic: addition, subtraction, multiplication, division
- Percent and sign-toggle operations
- Backspace/delete for single-digit correction
- **Full keyboard support** — use number keys, operators, Enter for equals, Escape to clear, Backspace to delete
- **Calculation history** — collapsible panel showing up to 50 recent calculations with timestamps
- Display auto-scales font size so large numbers never overflow
- Dark, refined UI with amber accent colors

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 |
| Language | TypeScript 5.7 (strict mode) |
| Deployment | Netlify |

## Running Locally

```bash
npm install
npm run dev
```

The dev server starts at [http://localhost:3000](http://localhost:3000). The Netlify CLI dev proxy runs on port 8888.

## Building for Production

```bash
npm run build
```

Output lands in `dist/client/` as configured in `netlify.toml`.
