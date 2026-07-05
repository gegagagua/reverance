'use client'

import { useCallback, useEffect } from 'react'
import type { Locale } from '@/i18n/config'
import type { ContentOverrides } from '@/lib/content/types'
import { saveContentAction } from '@/app/(admin)/admin/actions'
import { getIn, useAdminStore, type SaveStatus, type View } from './admin.state'

/** Seeds the store with the server-provided draft once on mount. */
export function useInit(initial: ContentOverrides): void {
  const init = useAdminStore((s) => s.init)
  useEffect(() => init(initial), [initial, init])
}

/** Live value + setter for the leaf at `path`. Subscribes to that field only. */
export function useField(path: string[]): readonly [string, (value: string) => void] {
  const value = useAdminStore((s) => getIn(s.draft, path)) as string | undefined
  const setValue = useAdminStore((s) => s.setValue)
  return [value ?? '', (v: string) => setValue(path, v)] as const
}

/** Active dashboard page + setter. */
export function useView(): readonly [View, (view: View) => void] {
  const view = useAdminStore((s) => s.view)
  const setView = useAdminStore((s) => s.setView)
  return [view, setView] as const
}

/** Active editing locale + setter. */
export function useLocale(): readonly [Locale, (locale: Locale) => void] {
  const locale = useAdminStore((s) => s.locale)
  const setLocale = useAdminStore((s) => s.setLocale)
  return [locale, setLocale] as const
}

export function useStatus(): SaveStatus {
  return useAdminStore((s) => s.status)
}

/** Persists the whole draft via the Server Action and reflects save status. */
export function useSave(): () => void {
  return useCallback(() => {
    const { draft, setStatus } = useAdminStore.getState()
    setStatus('saving')
    void saveContentAction(draft as ContentOverrides)
      .then(() => setStatus('saved'))
      .catch(() => setStatus('error'))
  }, [])
}
