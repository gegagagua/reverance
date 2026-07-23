import { useCallback, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { track, trackLead } from '@/lib/track'
import { getUtm } from '@/lib/utm'
import { useLeadStore } from './lead-form.state'

/** CTA source recorded with every lead from the post-hero quick form. */
export const LEAD_SOURCE = 'hero_quick_form'

/** GTM event fired when this form's lead is actually sent (mapped to `render`). */
export const LEAD_EVENT = 'Lead-form-submit-render'

/**
 * Behaviour for the compact post-hero lead form. Posts name + phone/WhatsApp to
 * the CRM with the apartment interest, CTA source and captured UTM params in
 * `answers`, fires the conversion, then routes to the Thank-You page.
 */
export function useLeadForm(locale: Locale) {
  const router = useRouter()
  const name = useLeadStore((s) => s.name)
  const phone = useLeadStore((s) => s.phone)
  const apartment = useLeadStore((s) => s.apartment)
  const status = useLeadStore((s) => s.status)
  const update = useLeadStore((s) => s.update)
  const setStatus = useLeadStore((s) => s.setStatus)

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
            phone: phone.trim(),
            project: '4969',
            source: LEAD_SOURCE,
            lead_form_submit: 'true',
            answers: { apartment, cta_source: LEAD_SOURCE, ...getUtm() },
          }),
        })
        if (!res.ok) throw new Error('CRM submission failed')
        track('form_submission', { apartment, source: LEAD_SOURCE })
        trackLead(LEAD_EVENT, { source: LEAD_SOURCE })
        router.push(`/${locale}/thank-you`)
      } catch {
        setStatus('error')
      }
    },
    [name, phone, apartment, locale, router, setStatus]
  )

  return { name, phone, apartment, status, update, submit }
}
