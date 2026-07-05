import { create } from 'zustand'
import { defaultLocale, type Locale } from '@/i18n/config'
import type { ContentOverrides } from '@/lib/content/types'

export type SaveStatus = 'idle' | 'saving' | 'saved' | 'error'

/** The active "page" in the dashboard: the landing view, the media library, or a
 * text section key (a top-level dictionary key such as `hero`, `gallery`, …). */
export type View = 'dashboard' | 'media' | string

/** Reads a value at a key path; returns undefined if any segment is missing. */
export function getIn(obj: unknown, path: readonly string[]): unknown {
  return path.reduce<unknown>((acc, key) => (acc == null ? acc : (acc as Record<string, unknown>)[key]), obj)
}

/** Immutably sets `value` at `path`, cloning only the nodes along the way. */
function setIn(obj: unknown, path: readonly string[], value: unknown): unknown {
  if (path.length === 0) return value
  const [head = '', ...rest] = path
  if (Array.isArray(obj)) {
    const arr = [...obj]
    const idx = Number(head)
    arr[idx] = setIn(arr[idx], rest, value)
    return arr
  }
  const rec = { ...(obj as Record<string, unknown>) }
  rec[head] = setIn(rec[head], rest, value)
  return rec
}

interface AdminState {
  draft: ContentOverrides
  view: View
  locale: Locale
  status: SaveStatus
  init: (draft: ContentOverrides) => void
  setValue: (path: string[], value: string) => void
  setView: (view: View) => void
  setLocale: (locale: Locale) => void
  setStatus: (status: SaveStatus) => void
}

const EMPTY: ContentOverrides = { text: {}, images: {} }

/** Holds the working copy of all editable content while the admin edits it. */
export const useAdminStore = create<AdminState>((set) => ({
  draft: EMPTY,
  view: 'dashboard',
  locale: defaultLocale,
  status: 'idle',
  init: (draft) => set({ draft }),
  setValue: (path, value) =>
    set((s) => ({ draft: setIn(s.draft, path, value) as ContentOverrides, status: 'idle' })),
  setView: (view) => set({ view }),
  setLocale: (locale) => set({ locale }),
  setStatus: (status) => set({ status }),
}))
