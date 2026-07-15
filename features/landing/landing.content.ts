/** Intent-targeted SEO landing pages (item #14). Slugs are English + shared
 * across locales (canonical is per-locale: /{lang}/l/{slug}); the copy for each
 * lives in the dictionary under `landings[slug]`, so all three locales stay in
 * sync via the Dictionary type. */
export const LANDING_SLUGS = [
  'invest-in-batumi-real-estate',
  'apartments-for-sale-in-batumi',
  'buy-property-in-georgia-foreigners',
  'batumi-rental-property-roi',
  'property-management-in-batumi',
  'studio-apartments-in-batumi',
] as const

export type LandingSlug = (typeof LANDING_SLUGS)[number]

export function isLandingSlug(value: string): value is LandingSlug {
  return (LANDING_SLUGS as readonly string[]).includes(value)
}
