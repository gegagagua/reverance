import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. The buyer journey as numbered steps (item #11) — from
 * choosing an apartment to rental-management onboarding. A risk-reducing "how it
 * works" that shows the process is transparent end to end.
 */
export function Process({ content }: { content: Dictionary['process'] }) {
  return (
    <Section id="process">
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
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
          {content.steps.map((step, index) => (
            <li key={step.title} className="flex flex-col gap-3 bg-background p-8">
              <span className="font-heading text-2xl text-accent">{String(index + 1).padStart(2, '0')}</span>
              <Heading as="h3" size="md">
                {step.title}
              </Heading>
              <Text tone="muted">{step.description}</Text>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
