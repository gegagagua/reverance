# Architecture

Reverance is a **server-first** Next.js 16 (App Router) marketing site. The guiding
principle: render on the server by default, and let only genuinely interactive leaves
become Client Components. Performance is the first-class constraint, not an afterthought.

## Stack

| Concern    | Choice                       | Why                                                       |
| ---------- | ---------------------------- | --------------------------------------------------------- |
| Framework  | Next.js 16.2 (App Router)    | RSC streaming, file-system routing, built-in perf tooling |
| UI runtime | React 19.2                   | Server Components, `use` API, modern hooks                |
| Styling    | Tailwind CSS v4 (CSS config) | Utility-only; tokens via `@theme` in `app/globals.css`    |
| State      | Zustand 5                    | ~1 KB, selector subscriptions, no Provider boilerplate    |
| Language   | TypeScript (strict)          | End-to-end types; `noUncheckedIndexedAccess` on           |

> This Next.js is a customized build. Always read `node_modules/next/dist/docs/`
> before using a framework API — conventions differ from upstream (e.g. request
> middleware is `proxy.ts`, not `middleware.ts`).

## Directory layout

```
proxy.ts              Locale negotiation + redirect (this build's "middleware")
app/                  Routing only — everything nested under the [lang] segment
  [lang]/
    layout.tsx        Root layout (Server); <html lang>, fonts, generateStaticParams
    page.tsx          Home route; loads the dictionary, composes features (Server)
    globals.css       Tailwind import + design tokens (@theme)
    loading.tsx       Route Suspense fallback
    error.tsx         Route error boundary (Client)
    not-found.tsx     404
i18n/                 Internationalization (en / ka / ru)
  config.ts           locales, defaultLocale, Locale type, isLocale (client-safe)
  dictionaries.ts     server-only getDictionary + Dictionary type
  dictionaries/*.json One translation file per locale
components/ui/         SHARED primitives — the only place UI atoms are defined
  <name>/
    <name>.ui.tsx     Presentation
    <name>.logic.ts   Variant maps / pure helpers (only when non-trivial)
    index.ts          Public surface
  index.ts            Barrel — import everything from '@/components/ui'
features/             Feature modules; compose primitives, never raw HTML atoms
  <name>/
    <name>.ui.tsx     Presentation (adds 'use client' only if interactive)
    <name>.logic.ts   Hooks + handlers; the bridge between state and UI
    <name>.state.ts   Zustand store (only when the feature owns state)
    <name>.content.ts Static copy / data
    index.ts          Public surface
lib/                  Framework-agnostic utilities (cn, variants)
docs/                 You are here
.claude/skills/       Repo scaffolding skills (see below)
```

## The three-layer module (ui / logic / state)

Every non-trivial unit is split into up to three files so that responsibilities —
and re-renders — stay isolated:

- **`.state.ts`** — owns the Zustand store and its actions. No React, no JSX.
- **`.logic.ts`** — custom hooks and event handlers. The _only_ module that reads
  the store, and it does so with field-level selectors so renders stay surgical.
- **`.ui.tsx`** — presentation. Consumes the logic hook; contains no business rules.

A purely static, stateless unit (e.g. `Hero`) needs only `.ui.tsx` (+ `.content.ts`).
Add `.logic`/`.state` the moment real behavior appears. See
[CONVENTIONS.md](./CONVENTIONS.md) for the full rule set and
[PERFORMANCE.md](./PERFORMANCE.md) for why the split pays off.

## Internationalization (i18n)

The site ships in **English (`en`), Georgian (`ka`), and Russian (`ru`)**.

- **Routing.** Every route lives under `app/[lang]/`. `proxy.ts` runs first, negotiates
  a locale from the `Accept-Language` header (dependency-free, against our 3 locales),
  and redirects locale-less paths (`/` → `/en`). All three locales are prerendered via
  `generateStaticParams`.
- **Content.** Translations are JSON dictionaries under `i18n/dictionaries/`, loaded by
  `getDictionary(locale)` — which is `server-only`, so **no translation strings reach
  the client bundle**. `en.json` is the source-of-truth type; ka/ru must match its shape
  or the build fails.
- **Flow.** A Server Component (the page) loads the dictionary and passes typed slices
  (`dict.hero`, `dict.newsletter`, …) as props to features. Feature UIs are
  text-agnostic — they render whatever locale slice they're given.
- **Switching.** `features/locale-switcher` is a small client leaf that swaps the
  leading path segment to the chosen locale.

> Adding a locale: add the code to `i18n/config.ts` + `localeNames`, drop in a matching
> `i18n/dictionaries/<code>.json`, and register its loader in `dictionaries.ts`.

## Server vs Client boundary

The page tree is Server by default. `'use client'` lives only at the smallest
interactive leaf (`features/newsletter/newsletter.ui.tsx`). Server Components fetch
data and render copy; they pass serializable props down to client leaves. This keeps
the shipped JavaScript bundle close to the interactive surface area — nothing more.
