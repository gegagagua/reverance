import { useCallback, useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import type { LeadStatus } from '@/features/lead-form/lead-form.state'
import { track, trackLead } from '@/lib/track'
import { useFormStart } from '@/lib/use-form-start'
import { getUtm } from '@/lib/utm'

/**
 * Per-instance behaviour for the inline phone-capture widget shown statically on
 * the hero and apartment sliders. Posts a phone-only lead to the same CRM proxy
 * as the quick form, then routes to Thank-You. State is local (not a shared
 * store) so multiple widgets on the page never share a typed value.
 */
export function useQuickCall(
  locale: Locale,
  source: string,
  apartment?: string,
  leadEvent?: string,
  startEvent?: string
) {
  const router = useRouter()
  const [phone, setRawPhone] = useState('')
  const [status, setStatus] = useState<LeadStatus>('idle')
  const onStart = useFormStart(startEvent)
  const setPhone = useCallback(
    (value: string) => {
      onStart()
      setRawPhone(value)
    },
    [onStart]
  )

  const submit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (phone.trim().length < 5) {
        setStatus('error')
        return
      }
      setStatus('submitting')
      try {
        const res = await fetch('/api/crm/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            phone: phone.trim(),
            project: '4969',
            source,
            lead_form_submit: 'true',
            answers: { apartment: apartment ?? '', cta_source: source, ...getUtm() },
          }),
        })
        if (!res.ok) throw new Error('CRM submission failed')
        track('form_submission', { apartment: apartment ?? '', source })
        if (leadEvent) trackLead(leadEvent, { source })
        router.push(`/${locale}/thank-you`)
      } catch {
        setStatus('error')
      }
    },
    [phone, source, apartment, leadEvent, locale, router]
  )

  return { phone, setPhone, status, submit }
}
