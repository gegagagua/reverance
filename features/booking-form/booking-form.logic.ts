import { useCallback, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { track, trackLead } from '@/lib/track'
import { useFormStart } from '@/lib/use-form-start'
import { getUtm } from '@/lib/utm'
import { useBookingStore, type BookingFields } from './booking-form.state'

/**
 * Bridges the booking store to the form. Field-level selectors keep typing in
 * one input from re-rendering the others. On success it posts the lead to the
 * CRM (same endpoint the legacy site uses, via `/api/crm/submit`), fires the
 * `form_submission` conversion and routes to the locale's Thank-You page.
 */
/** Fields whose typing counts as "starting" the form (selects/radios don't). */
const TYPED_FIELDS: (keyof BookingFields)[] = ['name', 'phone', 'email']

export function useBookingForm(locale: Locale, leadEvent?: string, startEvent?: string) {
  const router = useRouter()
  const name = useBookingStore((s) => s.name)
  const countryCode = useBookingStore((s) => s.countryCode)
  const phone = useBookingStore((s) => s.phone)
  const email = useBookingStore((s) => s.email)
  const apartment = useBookingStore((s) => s.apartment)
  const channel = useBookingStore((s) => s.channel)
  const time = useBookingStore((s) => s.time)
  const source = useBookingStore((s) => s.source)
  const status = useBookingStore((s) => s.status)
  const setStatus = useBookingStore((s) => s.setStatus)
  const setFields = useBookingStore((s) => s.update)
  const onStart = useFormStart(startEvent)
  const update = useCallback(
    (patch: Partial<BookingFields>) => {
      if (TYPED_FIELDS.some((f) => f in patch)) onStart()
      setFields(patch)
    },
    [onStart, setFields]
  )

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!name.trim() || phone.trim().length < 5) {
        setStatus('error')
        return
      }
      setStatus('submitting')
      try {
        const res = await fetch('/api/crm/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name.trim(),
            phone: `${countryCode}${phone.trim()}`,
            project: '4969',
            source: source || 'landing',
            lead_form_submit: 'true',
            answers: { apartment, channel, time, cta_source: source, ...getUtm() },
          }),
        })
        if (!res.ok) throw new Error('CRM submission failed')
        track('form_submission', { channel, apartment, source })
        if (leadEvent) trackLead(leadEvent, { source })
        router.push(`/${locale}/thank-you`)
      } catch {
        setStatus('error')
      }
    },
    [name, countryCode, phone, channel, time, apartment, source, leadEvent, locale, router, setStatus]
  )

  return { name, countryCode, phone, email, apartment, channel, time, status, update, submit }
}
