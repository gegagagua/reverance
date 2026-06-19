import { Container, Heading, Section, Text } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { BookingForm } from '@/features/booking-form'

/**
 * Server Component, light band. The single conversion point: lead form beside a
 * contact-details column. Holds the page's only `#contact` anchor.
 */
export function Contact({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const info = [
    { label: content.callLabel, value: content.phoneValue },
    { label: content.salesLabel, value: content.salesValue },
    { label: content.hoursLabel, value: content.hoursValue },
    { label: content.officeLabel, value: content.officeValue },
  ]
  return (
    <Section id="contact" className="bg-foreground/[0.02]">
      <Container className="grid gap-12 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
          <Heading as="h2" size="lg">
            {content.heading}
          </Heading>
          <Text>{content.subtitle}</Text>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            {info.map((row) => (
              <div key={row.label} className="flex flex-col gap-1">
                <dt className="text-xs uppercase tracking-widest text-foreground/50">{row.label}</dt>
                <dd className="text-foreground/80">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <BookingForm content={content} locale={locale} />
      </Container>
    </Section>
  )
}
