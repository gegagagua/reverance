import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Amenities as a numbered card grid ("01 Rooftop Infinity
 * Pool", …) — the icon-card layout the brief calls for.
 */
export function Overview({ content }: { content: Dictionary['overview'] }) {
  return (
    <Section id="amenities">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg" className="max-w-2xl">
            {content.heading}
          </Heading>
        </div>
        <ul className="grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item, index) => (
            <li key={item.title} className="flex flex-col gap-3 bg-background p-8">
              <span className="font-heading text-2xl text-accent">{String(index + 1).padStart(2, '0')}</span>
              <Heading as="h3" size="md">
                {item.title}
              </Heading>
              <Text tone="muted">{item.description}</Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
