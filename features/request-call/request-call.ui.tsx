'use client'

import { Heading, Modal, Text } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { BookingForm } from '@/features/booking-form'
import { useRequestCall } from './request-call.logic'

/**
 * The "Request a Call" modal — mounted once per page. Reuses the contact
 * section's lead form so the popup mirrors what visitors see in `#contact`.
 */
export function RequestCallModal({ content, locale }: { content: Dictionary['contact']; locale: Locale }) {
  const { open, close } = useRequestCall()
  return (
    <Modal open={open} onClose={close} label={content.heading}>
      <div className="flex flex-col gap-4">
        <span className="text-sm uppercase tracking-widest text-accent">{content.eyebrow}</span>
        <Heading as="h2" size="md">
          {content.heading}
        </Heading>
        <Text>{content.subtitle}</Text>
        <div className="mt-2">
          <BookingForm content={content} locale={locale} />
        </div>
      </div>
    </Modal>
  )
}
