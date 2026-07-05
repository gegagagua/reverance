'use client'

import { Button } from '@/components/ui'
import { cn } from '@/lib/cn'
import { locales, localeNames } from '@/i18n/config'
import { logoutAction } from '@/app/(admin)/admin/actions'
import { useLocale, useSave, useStatus, useView } from './admin.logic'
import { sectionLabel } from './admin.content'

const STATUS: Record<string, string> = { saving: 'Saving…', saved: 'Saved ✓', error: 'Save failed' }

/** Top bar: page title, language switcher (text pages only), Save + Log out. */
export function AdminTopbar() {
  const [view] = useView()
  const [locale, setLocale] = useLocale()
  const save = useSave()
  const status = useStatus()

  const isText = view !== 'dashboard' && view !== 'media'
  const title = view === 'dashboard' ? 'Dashboard' : view === 'media' ? 'Media Library' : sectionLabel(view)

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-foreground/10 bg-background/95 px-6 py-3 backdrop-blur">
      <h1 className="text-lg font-semibold">{title}</h1>
      <div className="flex items-center gap-3">
        {isText ? (
          <div className="flex rounded-full border border-foreground/15 p-0.5">
            {locales.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => setLocale(l)}
                className={cn(
                  'rounded-full px-3 py-1 text-xs transition-colors',
                  l === locale ? 'bg-foreground text-background' : 'text-foreground/60 hover:text-foreground'
                )}
              >
                {localeNames[l]}
              </button>
            ))}
          </div>
        ) : null}
        <span className="min-w-16 text-sm text-foreground/60">{STATUS[status] ?? ''}</span>
        <Button variant="accent" size="sm" onClick={save} disabled={status === 'saving'}>
          Save changes
        </Button>
        <form action={logoutAction}>
          <Button type="submit" variant="secondary" size="sm">
            Log out
          </Button>
        </form>
      </div>
    </header>
  )
}
