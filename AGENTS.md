<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Reverance project rules

Performance is the **#1 priority**. Full detail in [`docs/`](./docs); the
non-negotiables:

1. **Shared components only.** Define UI atoms once in `components/ui/` and import
   from `@/components/ui`. Features compose primitives — no one-off styled atoms.
2. **Tailwind utilities only.** No CSS Modules / custom class names. `globals.css`
   holds only the Tailwind import and `@theme` tokens. Compose classes with
   `lib/cn.ts` / `lib/variants.ts`.
3. **Three-layer modules.** Split each non-trivial unit into `<name>.ui.tsx`
   (presentation), `<name>.logic.ts` (hooks/handlers, the only store reader), and
   `<name>.state.ts` (Zustand store). Omit empty layers; static copy → `.content.ts`.
4. **Max 120 lines per file** (ESLint `max-lines`). Split when you approach it.
5. **Server-first.** Server Components by default; add `'use client'` only at the
   smallest interactive leaf. Subscribe to Zustand with one selector per field.
6. **Gates before commit:** `yarn lint`, `yarn typecheck`, `yarn format:check`,
   `yarn build` must all pass.

Scaffolding skills live in `.claude/skills/` — use `/new-feature` and
`/new-ui-primitive` to generate compliant modules.
