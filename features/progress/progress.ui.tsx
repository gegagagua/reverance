import { Container, Heading, Section, Text } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'

/**
 * Server Component. Dated construction milestones (item #10). The tinted block is
 * a placeholder for each stage's photo — swap the gradient for a real dated image
 * per stage as the build progresses (content is admin-editable).
 */
export function Progress({ content }: { content: Dictionary['progress'] }) {
  return (
    <Section id="progress">
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
        <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {content.stages.map((stage) => (
            <li
              key={stage.title}
              className="flex flex-col overflow-hidden rounded-2xl border border-foreground/10"
            >
              <div className="flex aspect-[4/3] items-end bg-gradient-to-br from-foreground/80 to-accent/70 p-4">
                <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-foreground">
                  {stage.date}
                </span>
              </div>
              <div className="flex flex-col gap-2 p-5">
                <span className="text-xs uppercase tracking-widest text-accent">{stage.status}</span>
                <Heading as="h3" size="md">
                  {stage.title}
                </Heading>
                <Text tone="muted" className="text-sm">
                  {stage.description}
                </Text>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
