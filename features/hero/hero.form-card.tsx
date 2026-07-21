'use client'

import { useCallback } from 'react'
import { Heading, Text } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { BookingForm, useBookingStore } from '@/features/booking-form'

/**
 * The full "Begin a conversation" lead form rendered as a light card over the
 * hero slider, so the primary conversion is visible on every slide without
 * opening the modal. Reuses the shared BookingForm; focusing it attributes the
 * lead to the hero via the shared booking store's `source`.
 */
export function HeroFormCard({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const update = useBookingStore((s) => s.update)
  const seed = useCallback(() => update({ source: 'hero_form' }), [update])
  return (
    <div
      onFocusCapture={seed}
      className="w-full max-w-md rounded-3xl bg-white p-6 text-foreground shadow-2xl sm:p-8"
    >
      <div className="mb-5 flex flex-col gap-2">
        <span className="text-xs uppercase tracking-widest text-accent">{content.eyebrow}</span>
        <Heading as="h2" size="md">
          {content.heading}
        </Heading>
        <Text className="text-sm text-foreground/70">{content.subtitle}</Text>
      </div>
      <BookingForm content={content} locale={locale} />
    </div>
  )
}
