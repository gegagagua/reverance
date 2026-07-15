import 'server-only'
import { locales, type Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { GEO, LOGO_PATH, ORG_NAME, PROJECT_NAME, SITE_URL } from '@/lib/site'

const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Anatoli Kacharava Street #5',
  addressLocality: 'Batumi',
  addressRegion: 'Adjara',
  addressCountry: 'GE',
}

/** Stable @id anchors so the nodes in the @graph can reference each other. */
const ID = {
  org: `${SITE_URL}/#organization`,
  site: `${SITE_URL}/#website`,
  complex: `${SITE_URL}/#project`,
  business: `${SITE_URL}/#salesoffice`,
}

/**
 * Builds the site-wide JSON-LD @graph for one locale from our own dictionary —
 * Organization, WebSite, ApartmentComplex, LocalBusiness, FAQPage and
 * BreadcrumbList. All facts (phones, address, FAQ) come from the dictionary, so
 * the markup stays in sync with the rendered page and each locale's copy.
 */
export function buildSchemaGraph(locale: Locale, dict: Dictionary) {
  const pageUrl = `${SITE_URL}/${locale}`
  const logo = `${SITE_URL}${LOGO_PATH}`

  const organization = {
    '@type': 'Organization',
    '@id': ID.org,
    name: ORG_NAME,
    url: SITE_URL,
    logo,
    email: dict.footer.email,
    address: ADDRESS,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: dict.contact.phoneValue,
      contactType: 'sales',
      areaServed: 'GE',
      availableLanguage: ['en', 'ka', 'ru'],
    },
  }

  const website = {
    '@type': 'WebSite',
    '@id': ID.site,
    url: SITE_URL,
    name: PROJECT_NAME,
    inLanguage: [...locales],
    publisher: { '@id': ID.org },
  }

  const apartmentComplex = {
    '@type': 'ApartmentComplex',
    '@id': ID.complex,
    name: PROJECT_NAME,
    description: dict.meta.description,
    url: pageUrl,
    image: logo,
    address: ADDRESS,
    geo: { '@type': 'GeoCoordinates', latitude: GEO.project.lat, longitude: GEO.project.lng },
    developer: { '@id': ID.org },
  }

  const localBusiness = {
    '@type': 'LocalBusiness',
    '@id': ID.business,
    name: `${ORG_NAME} — Batumi Sales Office`,
    url: pageUrl,
    image: logo,
    telephone: dict.contact.salesValue,
    email: dict.footer.email,
    address: ADDRESS,
    geo: { '@type': 'GeoCoordinates', latitude: GEO.sales.lat, longitude: GEO.sales.lng },
    openingHours: 'Mo-Su 10:00-18:00',
    parentOrganization: { '@id': ID.org },
  }

  const faqPage = {
    '@type': 'FAQPage',
    mainEntity: dict.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const breadcrumb = {
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: PROJECT_NAME, item: pageUrl }],
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [organization, website, apartmentComplex, localBusiness, faqPage, breadcrumb],
  }
}
