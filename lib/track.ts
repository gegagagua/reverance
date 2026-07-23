/**
 * Conversion events, fired to every configured analytics sink (GTM dataLayer +
 * Meta Pixel). Names map 1:1 to the tracking plan in the brief. No-ops on the
 * server and when no analytics IDs are configured — safe to call anywhere.
 */
export type TrackEvent =
  | 'form_submission'
  | 'thank_you_view'
  | 'click_whatsapp'
  | 'click_viber'
  | 'click_call'
  | 'cta_click'
  | 'download_presentation'

type TrackProps = Record<string, string | number | boolean | undefined>

interface TrackWindow extends Window {
  dataLayer?: Record<string, unknown>[]
  fbq?: (...args: unknown[]) => void
}

/** Push a conversion event to GTM's dataLayer and Meta Pixel (if present). */
export function track(event: TrackEvent, props: TrackProps = {}): void {
  if (typeof window === 'undefined') return
  const w = window as TrackWindow
  w.dataLayer?.push({ event, ...props })
  w.fbq?.('trackCustom', event, props)
}

/**
 * Fires a form-specific lead event to GTM's dataLayer. Called ONLY after the CRM
 * POST succeeds, so merely opening a form and clicking submit (without sending a
 * real lead) never fires it. `event` is the exact Tag Manager trigger name for
 * each form (e.g. `lead_form_submit_footer`); its mixed casing/spelling is the
 * agreed contract with GTM and must be pushed verbatim — do not normalise it.
 */
export function trackLead(event: string, props: TrackProps = {}): void {
  if (typeof window === 'undefined') return
  const w = window as TrackWindow
  w.dataLayer?.push({ event, ...props })
}
