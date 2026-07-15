/**
 * UTM + click-id capture. Ad traffic lands with `?utm_*`/`gclid`/`fbclid` on the
 * URL; we persist them to sessionStorage on first load so every lead submitted
 * later in the visit carries attribution, even after in-page navigation. Pure
 * client util — safe no-ops on the server.
 */
const KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'gclid',
  'fbclid',
] as const

const STORE_KEY = 'reve_attribution'

export type Utm = Partial<Record<(typeof KEYS)[number], string>>

/** Read this visit's UTM params off the URL and merge them into sessionStorage. */
export function captureUtm(): void {
  if (typeof window === 'undefined') return
  const params = new URLSearchParams(window.location.search)
  const fresh: Utm = {}
  for (const key of KEYS) {
    const value = params.get(key)
    if (value) fresh[key] = value
  }
  if (Object.keys(fresh).length === 0) return
  sessionStorage.setItem(STORE_KEY, JSON.stringify({ ...getUtm(), ...fresh }))
}

/** Return the attribution captured so far this visit (empty when none). */
export function getUtm(): Utm {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(sessionStorage.getItem(STORE_KEY) ?? '{}') as Utm
  } catch {
    return {}
  }
}
