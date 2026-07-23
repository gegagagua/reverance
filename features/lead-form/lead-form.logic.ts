import { useCallback, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import type { Locale } from '@/i18n/config'
import { track, trackLead } from '@/lib/track'
import { useFormStart } from '@/lib/use-form-start'
import { getUtm } from '@/lib/utm'
import { useLeadStore } from './lead-form.state'

/** CTA source recorded with every lead from the post-hero quick form. */
export const LEAD_SOURCE = 'hero_quick_form'

/** GTM event fired when this form's lead is actually sent (the `quick` slot). */
export const LEAD_EVENT = 'lead_form_submit_quick'

/** GTM event fired the first time a visitor types into this form. */
export const START_EVENT = 'lead_form_start_quick'

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
  const setStatus = useLeadStore((s) => s.setStatus)
  const setFields = useLeadStore((s) => s.update)
  const onStart = useFormStart(START_EVENT)
  const update = useCallback(
    (patch: Partial<{ name: string; phone: string; apartment: string }>) => {
      if ('name' in patch || 'phone' in patch) onStart()
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
