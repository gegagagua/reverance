# Performance

Performance is the project's first priority. Every convention traces back to one of
two budgets: **bytes shipped to the browser** and **renders done at runtime**.

## Minimize client JavaScript

- **Server by default.** Pages and layouts render on the server and ship zero JS for
  their static parts. Only `features/newsletter` crosses the `'use client'` boundary.
- **Push `'use client'` to the leaf.** Marking a parent client pulls its whole import
  graph into the bundle. Mark the smallest interactive component instead, and pass
  Server-rendered children through as props/`children`.
- **No heavyweight utility deps.** `lib/cn.ts` is a one-line `filter().join()`; we
  deliberately avoid `clsx` + `tailwind-merge` on the client hot path. `variants` is
  hand-rolled for the same reason.
- **Links over JS where possible.** CTAs are `next/link` styled with `buttonClass`,
  not click-handler buttons — navigation needs no client runtime.

## Minimize re-renders

- **Selector subscriptions.** `.logic` hooks read Zustand one field at a time
  (`useStore((s) => s.email)`). A keystroke re-renders only the subscribed leaf, not
  the form or the page.
- **Stable references.** Store actions are created once in `.state`, so passing them
  as props never invalidates memoization. Handlers are wrapped in `useCallback`.
- **Derive, don't store.** Computed values (e.g. validity) are derived in `.logic`
  during render rather than mirrored into state and synced with effects.

## Rendering & loading

- **Streaming + Suspense.** `app/loading.tsx` streams a skeleton while the route
  resolves, improving perceived load and TTFB.
- **Fonts.** `next/font` self-hosts Geist with `font-display: swap` and no layout
  shift — no render-blocking font requests.
- **CSS.** Tailwind v4 emits only the utilities actually used; production builds
  code-split CSS per route automatically.

## Verifying

- `yarn build` prints the per-route **First Load JS**. Watch it — a sudden jump
  usually means a `'use client'` crept up the tree or a heavy dep was imported into a
  client module.
- Keep an eye on Core Web Vitals (LCP/CLS/INP); the ESLint `core-web-vitals` config
  already flags common regressions (unsized images, sync scripts, etc.).
