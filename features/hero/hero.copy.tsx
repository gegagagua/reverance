import { Container, Heading, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'
import { RequestCallButton } from '@/features/request-call'

/** Server Component. Hero overlay copy + CTA, shown statically over every slide. */
export function HeroCopy({ content }: { content: Dictionary['hero'] }) {
  return (
    <Container className="relative z-10 w-full pb-24 pt-28">
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
        <RequestCallButton variant="accent" size="lg" data-cta="hero" className="mt-2 w-fit">
          {content.cta}
        </RequestCallButton>
      </div>
    </Container>
  )
}
