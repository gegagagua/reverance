import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

type LandingCopy = Dictionary['landings'][keyof Dictionary['landings']]

/**
 * Intent landing hero (item #14): a keyword-focused H1 + intro with a text
 * breadcrumb, sitting above the reused conversion sections. Server Component.
 */
export function LandingHero({ content, brand }: { content: LandingCopy; brand: string }) {
  return (
    <Section className="pt-28 sm:pt-32">
      <Container className="flex flex-col gap-5">
        <nav aria-label="Breadcrumb" className="text-xs uppercase tracking-widest text-accent">
          {brand} · {content.eyebrow}
        </nav>
        <Heading as="h1" size="xl" className="max-w-3xl">
          {content.h1}
        </Heading>
        <Text className="max-w-2xl text-lg">{content.intro}</Text>
      </Container>
    </Section>
  )
}
