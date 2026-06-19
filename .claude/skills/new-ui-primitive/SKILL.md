---
name: new-ui-primitive
description: Scaffold a shared UI primitive under components/ui following project conventions. Use when a reusable atom (button, input, badge, card, etc.) is needed app-wide. Takes the primitive name (kebab-case) as args.
---

# Scaffold a shared UI primitive

Add a reusable atom under `components/ui/<name>/`. Primitives are the **only** place
raw HTML elements and base styles are defined; everything else composes them.

## Steps

1. **Confirm the name** (kebab-case, e.g. `badge`) and PascalCase export (`Badge`).
2. **Create the files** (each ≤ 120 lines):
   - `components/ui/<name>/<name>.ui.tsx` — presentation. Spread native props
     (`...props`) and merge classes with `@/lib/cn`. Do **not** add `'use client'`
     unless the primitive itself needs browser APIs — keep it Server-compatible so it
     works in any tree.
   - `components/ui/<name>/<name>.logic.ts` — **only if** it has variants. Define a
     `variants(base, map, defaults)` resolver (see `button.logic.ts`) and export the
     class function plus variant types. Skip this file for trivial primitives.
   - `components/ui/<name>/index.ts` — re-export the component (and variant fn/types).
3. **Register it** in `components/ui/index.ts` (`export * from './<name>'`).
4. **Style with Tailwind utilities only.** Prefer theme tokens (`bg-background`,
   `text-foreground`) over raw colors. No custom class names or CSS files.
5. **Keep it accessible:** forward `aria-*`, use semantic elements, support
   `focus-visible` rings.
6. **Verify:** `yarn lint && yarn typecheck && yarn build`.

## Reference

`components/ui/button/` shows the variant pattern (`.logic` + `.ui`);
`components/ui/container/` shows the trivial single-file pattern.
