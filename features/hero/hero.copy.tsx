import { Container, Heading, Text } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { HeroFormCard } from './hero.form-card'

/** Server Component. Hero overlay copy beside the full lead form, shown
 * statically over every slide. */
export function HeroCopy({
  content,
  contact,
  locale,
}: {
  content: Dictionary['hero']
  contact: Dictionary['contact']
  locale: Locale
}) {
  return (
    <Container className="relative z-10 grid w-full items-center gap-12 pb-24 pt-28 lg:grid-cols-[1fr_minmax(0,28rem)]">
      <div className="flex max-w-3xl flex-col gap-6">
        <span className="text-sm uppercase tracking-widest text-white/80">{content.eyebrow}</span>
        <Heading as="h1" size="xl" className="text-white">
          {content.title}
        </Heading>
        <Text className="max-w-2xl text-white/80">{content.subtitle}</Text>
        <ul className="flex flex-wrap gap-3 text-sm text-white/90">
          <li className="rounded-full border border-white/25 px-4 py-1.5">{content.location}</li>
          <li className="rounded-full border border-white/25 px-4 py-1.5">{content.completion}</li>
        </ul>
      </div>
      <HeroFormCard content={contact} locale={locale} />
    </Container>
  )
}
