import Image from 'next/image'
import { Card, Container, Heading, Section, Stat, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'
import { INVESTMENT_ICONS } from './investment.content'

/**
 * Server Component. The page's core selling argument: visual stat numbers plus
 * icon cards — no long paragraphs, per the brief. The section CTA is the
 * `CtaBand` placed directly after it in the page.
 */
export function Investment({ content }: { content: Dictionary['investment'] }) {
  return (
    <Section id="investment">
      <Container className="flex flex-col gap-12">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg" className="max-w-2xl">
            {content.heading}
          </Heading>
          <Text className="max-w-2xl">{content.intro}</Text>
        </div>
        <div className="grid gap-8 rounded-2xl border border-foreground/10 bg-foreground/[0.02] p-8 sm:grid-cols-3">
          {content.stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
        <ul className="grid gap-6 sm:grid-cols-2">
          {content.reasons.map((reason, index) => (
            <li key={reason.title}>
              <Card tone="muted" className="flex h-full flex-col gap-3">
                <Image
                  src={INVESTMENT_ICONS[index] ?? INVESTMENT_ICONS[0] ?? ''}
                  alt=""
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain"
                />
                <Heading as="h3" size="md">
                  {reason.title}
                </Heading>
                <Text tone="muted">{reason.description}</Text>
              </Card>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  )
}
