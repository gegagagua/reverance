import type { Dictionary } from '@/i18n/dictionaries'
import { HeroSlider } from '@/features/hero-slider'
import { HeroCopy } from './hero.copy'

/**
 * Server Component. The 5-second answer: H1 investment message, location +
 * completion badges, and the single primary CTA (the form lives only in the
 * Contact section, so this CTA is not a duplicated form). The copy is hidden on
 * the first slide (see HeroCopy) so the hero opens on the image alone.
 */
export function Hero({ content }: { content: Dictionary['hero'] }) {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden text-white">
      <HeroSlider />
      <div className="pointer-events-none absolute inset-0 bg-black/45" />
      <HeroCopy content={content} />
    </section>
  )
}
