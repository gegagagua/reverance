---
name: new-feature
description: Scaffold a Reverance feature module following the ui/logic/state convention. Use when adding a new section, widget, or interactive piece under features/. Takes the feature name (kebab-case) as args.
---

# Scaffold a feature module

Create a new feature under `features/<name>/` that obeys the project rules in
`AGENTS.md` and `docs/CONVENTIONS.md`.

## Steps

1. **Confirm the name** (kebab-case, e.g. `pricing-table`). Derive the PascalCase
   component name (`PricingTable`).
2. **Decide which layers are needed:**
   - Static, no interactivity → only `<name>.ui.tsx` (+ `<name>.content.ts` for copy).
   - Owns client state → add `<name>.state.ts` (Zustand) and `<name>.logic.ts`.
3. **Create the files** (each ≤ 120 lines):
   - `features/<name>/<name>.state.ts` — Zustand store + actions. No React/JSX.
     Use `create<State>()(...)` with field-level actions.
   - `features/<name>/<name>.logic.ts` — a `use<Name>()` hook. Read the store with
     **one selector per field**. Wrap handlers in `useCallback`. The only store reader.
   - `features/<name>/<name>.ui.tsx` — presentation. Add `'use client'` **only** if it
     uses state/handlers/browser APIs. Compose primitives from `@/components/ui`;
     never write raw styled atoms.
   - `features/<name>/<name>.content.ts` — static copy/data, kept out of the markup.
   - `features/<name>/index.ts` — `export { <Name> } from './<name>.ui'`.
4. **Style with Tailwind utilities only.** Conditional classes via `@/lib/cn`.
5. **Compose it** into the relevant `app/**/page.tsx` (a Server Component).
6. **Verify:** run `yarn lint && yarn typecheck && yarn build`. All must pass.

## Reference

Mirror the existing `features/newsletter/` module — it demonstrates the full
state → logic → ui triad with selector-based subscriptions.
