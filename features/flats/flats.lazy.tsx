'use client'

import dynamic from 'next/dynamic'
import { Defer } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import type { QuickCallContent } from '@/features/quick-call'

// Below-the-fold island: the carousel state + swipe chunk loads on scroll.
const Flats = dynamic(() => import('./flats.ui').then((m) => m.Flats), { ssr: false })

/** Scroll-deferred apartments carousel. `min-h` reserves space to avoid shift. */
export function FlatsLazy(props: {
  content: Dictionary['flats']
  images: string[]
  locale: Locale
  quick: QuickCallContent
}) {
  return (
    <Defer className="min-h-[80vh]">
      <Flats {...props} />
    </Defer>
  )
}
