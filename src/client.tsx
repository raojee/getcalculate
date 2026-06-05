/**
 * src/client.tsx — Custom TanStack Start client entry
 *
 * TanStack Start's default client entry calls:
 *   hydrateRoot(document, <StartClient />)
 *   └─ StartClient → hydrateStart() → hydrate(router)
 *                                      └─ invariant(window.$_TSR)  ← crashes on mobile
 *
 * Capacitor serves from https://localhost/ with an empty <div id="root"> and
 * no server-rendered HTML, so there is no $_TSR bootstrap payload to hydrate
 * from. We bypass the SSR path entirely and use createRoot() instead.
 *
 * Detection strategy (two independent signals for belt-and-suspenders):
 *   1. import.meta.env.VITE_MOBILE_BUILD — set at build time via .env or CLI
 *   2. window.Capacitor — injected at runtime by the Capacitor bridge
 */
import { StrictMode, startTransition } from 'react'
import { getRouter } from './router'

// Capacitor sets this global before our JS runs.
const isCapacitor =
  typeof window !== 'undefined' &&
  // Runtime signal: Capacitor bridge present
  (('Capacitor' in window) ||
  // Build-time signal: compiled in via vite.config define / .env
  (import.meta.env.VITE_MOBILE_BUILD === 'true'))

if (isCapacitor) {
  // ── Mobile / Capacitor path ────────────────────────────────────────────────
  // Pure CSR mount — no hydrateRoot, no StartClient, no $_TSR needed.
  import('react-dom/client').then(({ createRoot }) => {
    import('@tanstack/react-router').then(({ RouterProvider }) => {
      const router = getRouter()
      const container = document.getElementById('root')!
      startTransition(() => {
        createRoot(container).render(
          <StrictMode>
            <RouterProvider router={router} />
          </StrictMode>,
        )
      })
    })
  })
} else {
  // ── Web / SSR path ─────────────────────────────────────────────────────────
  // Standard TanStack Start hydration — expects window.$_TSR from the server.
  import('react-dom/client').then(({ hydrateRoot }) => {
    import('@tanstack/react-start/client').then(({ StartClient }) => {
      startTransition(() => {
        hydrateRoot(
          document,
          <StrictMode>
            <StartClient />
          </StrictMode>,
        )
      })
    })
  })
}
