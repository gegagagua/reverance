# Conventions

These are enforced by ESLint, Prettier, and `tsc` where possible, and by review
where not. They are non-negotiable — the architecture only holds if every module
follows them.

## 1. Shared components only

- UI atoms (Button, Input, Heading, …) are defined **once** under `components/ui/`
  and imported from `@/components/ui`.
- Features and pages **compose** primitives. They do not define one-off styled
  elements that duplicate a primitive's job. Need a new atom? Add it to
  `components/ui/` so the whole app can reuse it.
- Raw HTML atoms (`<button>`, `<input>`, bare `<h1>`) belong inside a primitive's
  `.ui.tsx`, not in feature code.

## 2. Tailwind utilities only — no custom class names

- Style exclusively with Tailwind utility classes. No CSS Modules, no
  styled-components, no bespoke global classes.
- `app/globals.css` is limited to the Tailwind import and `@theme` design tokens.
- Conditional/variant classes are assembled with `lib/cn.ts` and `lib/variants.ts`,
  which only ever concatenate Tailwind strings.
- Prefer theme tokens (`bg-background`, `text-foreground`) over raw colors so dark
  mode and rebrands stay free.

## 3. One file per layer: ui / logic / state

- `.ui.tsx` — presentation only. No store access, no business logic.
- `.logic.ts` — hooks and handlers; the only reader of the store, via selectors.
- `.state.ts` — the Zustand store and its actions; no React.
- Omit a layer when it would be empty (a static component is just `.ui.tsx`).
- Static copy/data goes in `.content.ts`, kept out of the markup.

## 4. Max 120 lines per file

- Enforced by ESLint `max-lines` (blank lines and comments excluded). If a file
  approaches the limit, split it — usually a sign a new primitive or sub-feature
  wants to exist.

## 5. Tooling gates

| Command             | Gate                                                |
| ------------------- | --------------------------------------------------- |
| `yarn lint`         | ESLint (incl. `max-lines`, react-hooks, a11y)       |
| `yarn typecheck`    | `tsc --noEmit`, strict + `noUncheckedIndexedAccess` |
| `yarn format:check` | Prettier formatting                                 |
| `yarn build`        | Production build must pass                          |

Run all four before committing. `yarn format` auto-fixes formatting.

## 6. Imports

- Use the `@/` alias for cross-directory imports; reserve `./` for siblings within
  the same module.
- Import primitives from the barrel: `import { Button } from '@/components/ui'`.

## 7. React best practices

- Server Components by default; add `'use client'` only at interactive leaves.
- Subscribe to Zustand with one selector per field — never select an object
  literal without a stability check (it defeats memoization).
- Keep effects rare. Derive during render; reach for `useEffect` only for genuine
  external synchronization.
- Every list needs a stable, content-derived `key`.
