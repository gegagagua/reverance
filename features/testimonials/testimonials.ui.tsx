import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Client/partner testimonials (item #12) — a trust signal that
 * reinforces the management-service message. Placeholder quotes are admin-editable
 * via the dictionary; swap for real, attributable ones when available.
 */
export function Testimonials({ content }: { content: Dictionary['testimonials'] }) {
  return (
    <Section id="testimonials">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg" className="max-w-2xl">
            {content.heading}
          </Heading>
        </div>
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.items.map((item) => (
            <li
              key={item.name}
              className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8"
            >
              <div className="flex gap-0.5 text-accent" aria-label={`${item.rating}/5`}>
                {Array.from({ length: item.rating }).map((_, i) => (
                  <span key={i} aria-hidden>
                    ★
                  </span>
                ))}
              </div>
              <Text className="text-foreground/90">“{item.quote}”</Text>
              <div className="mt-auto flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-foreground/60">{item.role}</span>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
