import { Container, Heading, Section, Stat, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Short company profile (Otium) — headline, two paragraphs,
 * and a stat panel. Backs the "#about" anchor in the header nav and adds the
 * trust signals (experience, delivered projects) the brief calls for.
 */
export function About({ content }: { content: Dictionary['about'] }) {
  return (
    <Section id="about">
      <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg" className="max-w-xl">
            {content.heading}
          </Heading>
          {content.body.map((paragraph) => (
            <Text key={paragraph} tone="muted">
              {paragraph}
            </Text>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10">
          {content.stats.map((stat) => (
            <li key={stat.label} className="bg-background p-8">
              <Stat value={stat.value} label={stat.label} />
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
