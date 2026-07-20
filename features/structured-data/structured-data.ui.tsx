import { JsonLd } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { buildSchemaGraph } from '@/lib/seo/schema'

/** Server Component. Injects the locale-aware JSON-LD @graph (Organization,
 * WebSite, ApartmentComplex, LocalBusiness, FAQPage, BreadcrumbList). Pass
 * `crumb` on landing pages to extend the breadcrumb with a Home → Landing trail. */
export function StructuredData({
  locale,
  dict,
  crumb,
}: {
  locale: Locale
  dict: Dictionary
  crumb?: { name: string; slug: string }
}) {
  return <JsonLd data={buildSchemaGraph(locale, dict, crumb)} />
}
