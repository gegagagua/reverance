'use client'

import { Card, Container, Heading } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { BookingForm } from '@/features/booking-form'
import { useHeroFormVisible } from './hero.logic'

/** Lead form embedded in the hero, shown only on the first slide. Reuses the
 *  contact section's form so visitors can convert without scrolling. */
export function HeroForm({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const visible = useHeroFormVisible()

  return (
    <div
      aria-hidden={!visible}
      className={cn(
        'absolute inset-0 z-10 flex items-center transition-opacity duration-700',
        visible ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <Container className="w-full py-24">
        <div className="flex justify-end">
          <Card className="max-h-[80dvh] w-full max-w-md overflow-y-auto shadow-2xl">
            <div className="flex flex-col gap-4">
              <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
              <Heading as="h2" size="md">
                {content.heading}
              </Heading>
              <BookingForm content={content} locale={locale} />
            </div>
          </Card>
        </div>
      </Container>
    </div>
  )
}
