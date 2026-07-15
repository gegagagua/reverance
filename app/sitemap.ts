import type { MetadataRoute } from 'next'
import { defaultLocale, locales } from '@/i18n/config'
import { SITE_URL } from '@/lib/site'
import { LANDING_SLUGS } from '@/features/landing'

/** hreflang alternates for a locale-less path (e.g. '' or '/l/studios…'). */
function alternates(path: string) {
  return {
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
      'x-default': `${SITE_URL}/${defaultLocale}${path}`,
    },
  }
}

/**
 * Served at /sitemap.xml. Every indexable path is emitted once per locale with a
 * full hreflang alternate set: the localized home, privacy, and the intent
 * landing pages (item #14). Keep the origin in sync with lib/site.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['', '/privacy', ...LANDING_SLUGS.map((slug) => `/l/${slug}`)]
  return paths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: 'weekly' as const,
      priority: path === '' ? 1 : 0.7,
      alternates: alternates(path),
    }))
  )
}
