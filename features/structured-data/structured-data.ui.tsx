import { JsonLd } from '@/components/ui'
import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'
import { buildSchemaGraph } from '@/lib/seo/schema'

/** Server Component. Injects the locale-aware JSON-LD @graph (Organization,
 * WebSite, ApartmentComplex, LocalBusiness, FAQPage, BreadcrumbList). */
export function StructuredData({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return <JsonLd data={buildSchemaGraph(locale, dict)} />
}
