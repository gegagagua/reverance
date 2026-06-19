import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Investor FAQ built on native `<details>` / `<summary>` —
 * fully accessible disclosure with zero client JavaScript.
 */
export function Faq({ content }: { content: Dictionary['faq'] }) {
  return (
    <Section id="faq" className="bg-foreground/[0.02]">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg" className="max-w-2xl">
            {content.heading}
          </Heading>
        </div>
        <ul className="flex flex-col gap-3">
          {content.items.map((item) => (
            <li key={item.q}>
              <details className="group rounded-2xl border border-foreground/10 bg-background p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-heading text-lg [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-2xl text-accent transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <Text tone="muted" className="mt-3">
                  {item.a}
                </Text>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
