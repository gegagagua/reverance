'use client'

import { Container, Heading } from '@/components/ui'
import { RequestCallButton } from '@/features/request-call'
import { track } from '@/lib/track'

interface CtaContent {
  title: string
  button: string
}

/** GTM lead event per band, keyed by the band's `source` (button copy differs:
 * investment presentation / apartment plans / talk to an advisor). */
const LEAD_EVENT: Record<string, string> = {
  investment: 'lead_form_submit_investment',
  apartments: 'lead_form_submit_plans',
  location: 'lead_form_submit_advisor',
}

/**
 * High-contrast CTA band reused at each decision point (after Investment,
 * Apartments, Location). Client leaf so the button click fires a `cta_click`
 * conversion event and opens the shared "Request a Call" modal.
 */
export function CtaBand({ content, source }: { content: CtaContent; source: string }) {
  return (
    <section className="bg-surface py-16 text-white">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Heading as="h3" size="lg" className="max-w-2xl text-white">
          {content.title}
        </Heading>
        <RequestCallButton
          variant="accent"
          size="lg"
          leadContext={{ leadEvent: LEAD_EVENT[source] }}
          onClick={() => track('cta_click', { source })}
        >
          {content.button}
        </RequestCallButton>
      </Container>
    </section>
  )
}
