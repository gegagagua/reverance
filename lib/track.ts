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
