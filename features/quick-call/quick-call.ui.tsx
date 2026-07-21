'use client'

import { Button, Input } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Locale } from '@/i18n/config'
import { useQuickCall } from './quick-call.logic'

/** Copy for the inline widget, sourced from the localized dictionary at render. */
export interface QuickCallContent {
  placeholder: string
  button: string
  sending: string
  error: string
}

/**
 * Inline phone-capture shown statically over the hero and apartment sliders:
 * one phone field + a Request-a-Call submit that posts straight to the CRM, so
 * the visitor never has to open the modal. `tone="dark"` styles it for the hero
 * overlay; the default suits light backgrounds.
 */
export function QuickCall({
  content,
  locale,
  source,
  apartment,
  tone = 'light',
  className,
}: {
  content: QuickCallContent
  locale: Locale
  source: string
  apartment?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const q = useQuickCall(locale, source, apartment)
  const dark = tone === 'dark'
  return (
    <form onSubmit={q.submit} className={cn('flex w-full max-w-md flex-col gap-2', className)}>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          type="tel"
          aria-label={content.placeholder}
          placeholder={content.placeholder}
          value={q.phone}
          onChange={(e) => q.setPhone(e.target.value)}
          className={cn('flex-1', dark && 'border-white/30 bg-white/95 text-foreground')}
          required
        />
        <Button type="submit" variant="accent" disabled={q.status === 'submitting'} className="shrink-0">
          {q.status === 'submitting' ? content.sending : content.button}
        </Button>
      </div>
      {q.status === 'error' && (
        <p className={cn('text-sm', dark ? 'text-red-300' : 'text-red-600')} role="alert">
          {content.error}
        </p>
      )}
    </form>
  )
}
