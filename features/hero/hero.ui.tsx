import type { Dictionary } from '@/i18n/dictionaries'
import { HeroSlider } from '@/features/hero-slider'
import { HeroCopy } from './hero.copy'
import { HeroShell } from './hero.shell'

/**
 * Server Component. The 5-second answer: H1 investment message, location +
 * completion badges, and the single primary CTA — shown statically over every
 * slide while the background images cross-fade behind it.
 */
export function Hero({ content, slides }: { content: Dictionary['hero']; slides: string[] }) {
  return (
    <HeroShell>
      <HeroSlider slides={slides} />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <HeroCopy content={content} />
    </HeroShell>
  )
}
