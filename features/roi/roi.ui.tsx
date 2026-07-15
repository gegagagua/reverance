import { Container, Heading, Section, Text } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Makes the headline ROI credible (item #8): the assumptions
 * behind the number (price, nightly rate, occupancy, fees) beside three
 * conservative/average/optimistic net-return scenarios. Placeholder figures are
 * admin-editable via the dictionary.
 */
export function Roi({ content }: { content: Dictionary['roi'] }) {
  return (
    <Section id="roi">
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
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8">
            <span className="text-xs uppercase tracking-widest text-accent">{content.assumptionsLabel}</span>
            <dl className="flex flex-col divide-y divide-foreground/10">
              {content.assumptions.map((row) => (
                <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                  <dt className="text-sm text-foreground/70">{row.label}</dt>
                  <dd className="text-sm font-medium">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-accent">{content.scenariosLabel}</span>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {content.scenarios.map((scenario, index) => (
                <div
                  key={scenario.name}
                  className={cn(
                    'flex items-center justify-between gap-4 rounded-2xl border p-6',
                    index === 1 ? 'border-accent bg-accent/5' : 'border-foreground/10'
                  )}
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{scenario.name}</span>
                    <span className="text-sm text-foreground/60">{scenario.detail}</span>
                  </div>
                  <span className="font-heading text-3xl text-accent">{scenario.net}</span>
                </div>
              ))}
            </div>
            <Text tone="muted" className="text-xs">
              {content.disclaimer}
            </Text>
          </div>
        </div>
      </Container>
    </Section>
  )
}
