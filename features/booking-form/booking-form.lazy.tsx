'use client'

import dynamic from 'next/dynamic'
import { Defer } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

// Below-the-fold lead form: its validation/submission chunk loads on scroll.
const BookingForm = dynamic(() => import('./booking-form.ui').then((m) => m.BookingForm), { ssr: false })

/** Scroll-deferred booking form. `min-h` reserves space to avoid layout shift. */
export function BookingFormLazy(props: {
  content: Dictionary['contact']
  locale: Locale
  leadEvent?: string
  startEvent?: string
}) {
  return (
    <Defer className="min-h-[28rem]">
      <BookingForm {...props} />
    </Defer>
  )
}
