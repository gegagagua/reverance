'use client'

import { Container, Heading, buttonClass } from '@/components/ui'
import { track } from '@/lib/track'

interface CtaContent {
  title: string
  button: string
}

/**
 * High-contrast CTA band reused at each decision point (after Investment,
 * Apartments, Location). Client leaf so the button click fires a `cta_click`
 * conversion event; the link itself scrolls to the single contact form.
 */
export function CtaBand({ content, source }: { content: CtaContent; source: string }) {
  return (
    <section className="bg-surface py-16 text-white">
      <Container className="flex flex-col items-center gap-6 text-center">
        <Heading as="h3" size="lg" className="max-w-2xl text-white">
          {content.title}
        </Heading>
        <a
          href="#contact"
          onClick={() => track('cta_click', { source })}
          className={buttonClass({ variant: 'accent', size: 'lg' })}
        >
          {content.button}
        </a>
      </Container>
    </section>
  )
}
