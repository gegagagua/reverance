import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { HeroSlider } from '@/features/hero-slider'
import { HeroCopy } from './hero.copy'
import { HeroForm } from './hero.form'
import { HeroShell } from './hero.shell'

/**
 * Server Component. The 5-second answer: H1 investment message, location +
 * completion badges, and the single primary CTA. The first slide shows the copy +
 * CTA (see HeroCopy); the second slide swaps it for the embedded lead form (see
 * HeroForm). Only one is visible at a time, keyed off the active slide index.
 */
export function Hero({
  content,
  contact,
  locale,
  slides,
}: {
  content: Dictionary['hero']
  contact: Dictionary['contact']
  locale: Locale
  slides: string[]
}) {
  return (
    <HeroShell>
      <HeroSlider slides={slides} />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <HeroCopy content={content} />
      <HeroForm content={contact} locale={locale} />
    </HeroShell>
  )
}
