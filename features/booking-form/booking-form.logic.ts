import { useCallback, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { track } from '@/lib/track'
import { useBookingStore } from './booking-form.state'

/**
 * Bridges the booking store to the form. Field-level selectors keep typing in
 * one input from re-rendering the others. On success it posts the lead to the
 * CRM (same endpoint the legacy site uses, via `/api/crm/submit`), fires the
 * `form_submission` conversion and routes to the locale's Thank-You page.
 */
export function useBookingForm(locale: Locale) {
  const router = useRouter()
  const name = useBookingStore((s) => s.name)
  const countryCode = useBookingStore((s) => s.countryCode)
  const phone = useBookingStore((s) => s.phone)
  const email = useBookingStore((s) => s.email)
  const apartment = useBookingStore((s) => s.apartment)
  const channel = useBookingStore((s) => s.channel)
  const time = useBookingStore((s) => s.time)
  const status = useBookingStore((s) => s.status)
  const update = useBookingStore((s) => s.update)
  const setStatus = useBookingStore((s) => s.setStatus)

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
            source: 'landing',
            lead_form_submit: 'true',
          }),
        })
        if (!res.ok) throw new Error('CRM submission failed')
        track('form_submission', { channel, apartment })
        router.push(`/${locale}/thank-you`)
      } catch {
        setStatus('error')
      }
    },
    [name, countryCode, phone, channel, apartment, locale, router, setStatus]
  )

  return { name, countryCode, phone, email, apartment, channel, time, status, update, submit }
}
