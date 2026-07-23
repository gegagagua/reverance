'use client'

import { useEffect } from 'react'
import { Heading, Modal, Text } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { BookingForm, useBookingStore } from '@/features/booking-form'
import { useRequestCall } from './request-call.logic'

/**
 * The "Request a Call" modal — mounted once per page. Reuses the contact
 * section's lead form so the popup mirrors what visitors see in `#contact`.
 * When a CTA opens it with context, the apartment type + source are seeded into
 * the shared booking store so they travel with the submitted lead (item #4).
 */
export function RequestCallModal({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const { open, context, close } = useRequestCall()
  const update = useBookingStore((s) => s.update)
  useEffect(() => {
    if (!open) return
    const patch: { apartment?: string; source?: string } = {}
    if (context.apartment) patch.apartment = context.apartment
    if (context.source) patch.source = context.source
    if (Object.keys(patch).length) update(patch)
  }, [open, context, update])
  return (
    <Modal open={open} onClose={close} label={content.heading}>
      <div className="flex flex-col gap-4">
        <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
        <Heading as="h2" size="md">
          {content.heading}
        </Heading>
        <Text>{content.subtitle}</Text>
        <div className="mt-2">
          <BookingForm
            content={content}
            locale={locale}
            leadEvent={context.leadEvent}
            startEvent={context.startEvent}
          />
        </div>
      </div>
    </Modal>
  )
}
