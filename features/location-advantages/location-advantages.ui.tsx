import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Location benefits framed as return drivers (item #13):
 * proximity to sea/airport/boulevard tied to occupancy, nightly rate and resale
 * value — the "why the address matters" argument for the investment decision.
 */
export function LocationAdvantages({ content }: { content: Dictionary['locationAdvantages'] }) {
  return (
    <Section id="location-advantages">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg" className="max-w-2xl">
            {content.heading}
          </Heading>
          <Text tone="muted" className="max-w-2xl">
            {content.subtitle}
          </Text>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-3 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-6"
            >
              <span className="text-3xl" aria-hidden>
                {item.icon}
              </span>
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
