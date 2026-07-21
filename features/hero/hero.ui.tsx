import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { HeroSlider } from '@/features/hero-slider'
import { HeroCopy } from './hero.copy'
import { HeroShell } from './hero.shell'

/**
 * Server Component. The 5-second answer: H1 investment message, location +
 * completion badges, and the full "Begin a conversation" lead form — shown
 * statically over every slide while the background images cross-fade behind it.
 */
export function Hero({
  content,
  slides,
  locale,
  contact,
}: {
  content: Dictionary['hero']
  slides: string[]
  locale: Locale
  contact: Dictionary['contact']
}) {
  return (
    <HeroShell>
      <HeroSlider slides={slides} />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <HeroCopy content={content} contact={contact} locale={locale} />
    </HeroShell>
  )
}
