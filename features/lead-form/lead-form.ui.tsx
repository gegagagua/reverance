'use client'

import { Button, Container, Heading, Input, Section, Text } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { LEAD_SOURCE, useLeadForm } from './lead-form.logic'

const FIELD =
  'h-11 w-full rounded-full border border-foreground/15 bg-transparent px-5 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30'

/**
 * Compact lead form placed right after the hero (item #3). Three visible fields
 * (name, phone/WhatsApp, apartment interest) plus a hidden CTA-source field; the
 * captured UTM params ride along in the POST body (see the logic hook).
 */
export function LeadForm({ content, locale }: { content: Dictionary['leadForm']; locale: Locale }) {
  const f = useLeadForm(locale)
  return (
    <Section id="lead" className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 rounded-3xl border border-foreground/10 bg-foreground/[0.02] p-8 lg:grid-cols-[1fr_1.4fr] lg:items-center lg:p-10">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
            <Heading as="h2" size="md">
              {content.heading}
            </Heading>
            <Text tone="muted">{content.subtitle}</Text>
          </div>
          <form onSubmit={f.submit} className="grid gap-3 sm:grid-cols-2">
            <input type="hidden" name="cta_source" value={LEAD_SOURCE} readOnly />
            <Input
              aria-label={content.name}
              placeholder={content.name}
              value={f.name}
              onChange={(e) => f.update({ name: e.target.value })}
              required
            />
            <Input
              type="tel"
              aria-label={content.phone}
              placeholder={content.phone}
              value={f.phone}
              onChange={(e) => f.update({ phone: e.target.value })}
              required
            />
            <select
              aria-label={content.apartment}
              value={f.apartment}
              onChange={(e) => f.update({ apartment: e.target.value })}
              className={cn(FIELD)}
            >
              <option value="">{content.apartment}</option>
              {content.apartmentOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <Button type="submit" disabled={f.status === 'submitting'}>
              {f.status === 'submitting' ? content.sending : content.submit}
            </Button>
            {f.status === 'error' && (
              <p className="text-sm text-red-600 sm:col-span-2" role="alert">
                {content.error}
              </p>
            )}
          </form>
        </div>
      </Container>
    </Section>
  )
}
