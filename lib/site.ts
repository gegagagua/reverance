/** Single source of truth for the production origin. Used by the canonical-host
 * redirect (proxy.ts), metadata (canonical + hreflang), and JSON-LD. Keep in
 * sync with public/robots.txt and public/sitemap.xml. */
export const SITE_URL = 'https://reverance.ge'

/** Canonical production host. Any other host that resolves here (www., http)
 * is 308-redirected to `${SITE_URL}` so search engines index one origin. */
export const PROD_HOST = 'reverance.ge'

export const ORG_NAME = 'Otium Development'
export const PROJECT_NAME = 'Reverance by Otium'
export const LOGO_PATH = '/theme/images/logo.png'

/** Precise project + sales-office coordinates (shared with the location map). */
export const GEO = {
  project: { lat: 41.6172908, lng: 41.598081 },
  sales: { lat: 41.6325669, lng: 41.6136097 },
} as const
