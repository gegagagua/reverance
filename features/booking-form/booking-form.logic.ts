import { useCallback, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { track } from '@/lib/track'
import { useBookingStore } from './booking-form.state'

/**
 * Bridges the booking store to the form. Field-level selectors keep typing in
 * one input from re-rendering the others. On success it fires the
 * `form_submission` conversion and routes to the locale's Thank-You page.
 * Swap the stubbed delay for a Server Action / CRM call.
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
        await new Promise((resolve) => setTimeout(resolve, 600))
        track('form_submission', { channel, apartment })
        router.push(`/${locale}/thank-you`)
      } catch {
        setStatus('error')
      }
    },
    [name, phone, channel, apartment, locale, router, setStatus]
  )

  return { name, countryCode, phone, email, apartment, channel, time, status, update, submit }
}
