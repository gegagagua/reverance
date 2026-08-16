import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { defaultLocale, isLocale, locales } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getImages } from '@/lib/content/read'
import { SITE_URL } from '@/lib/site'
import { LANDING_SLUGS, LandingHero, isLandingSlug } from '@/features/landing'
import { StructuredData } from '@/features/structured-data'
import { SiteHeader } from '@/features/site-header'
import { LeadForm } from '@/features/lead-form'
import { Investment } from '@/features/investment'
// Temporarily hidden per client (2026-07-17): ROI calc not ready to publish.
// import { Roi } from '@/features/roi'
import { LocationAdvantages } from '@/features/location-advantages'
import { FlatsLazy } from '@/features/flats/flats.lazy'
import { Faq } from '@/features/faq'
import { Contact } from '@/features/contact'
import { SiteFooter } from '@/features/site-footer'
import { MobileDockLazy } from '@/features/mobile-dock/mobile-dock.lazy'
import { RequestCallModalLazy } from '@/features/request-call/request-call.lazy'
import { LiveCameraModalLazy } from '@/features/live-camera/live-camera.lazy'

type Params = { params: Promise<{ lang: string; slug: string }> }

/** Prerender every landing slug in every locale. */
export function generateStaticParams() {
  return locales.flatMap((lang) => LANDING_SLUGS.map((slug) => ({ lang, slug })))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params
  if (!isLocale(lang) || !isLandingSlug(slug)) return {}
  const dict = await getDictionary(lang)
  const copy = dict.landings[slug]
  const languages = Object.fromEntries(locales.map((l) => [l, `/${l}/l/${slug}`]))
  return {
    metadataBase: new URL(SITE_URL),
    title: copy.title,
    description: copy.description,
    keywords: copy.keywords,
    alternates: {
      canonical: `/${lang}/l/${slug}`,
      languages: { ...languages, 'x-default': `/${defaultLocale}/l/${slug}` },
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: 'website',
      locale: lang,
      url: `${SITE_URL}/${lang}/l/${slug}`,
    },
  }
}

/** Server Component. Intent SEO landing (item #14): keyword hero + the reused
 * conversion sections, so each page ranks and converts on its own. */
export default async function LandingPage({ params }: Params) {
  const { lang, slug } = await params
  if (!isLocale(lang) || !isLandingSlug(slug)) notFound()
  const [dict, images] = await Promise.all([getDictionary(lang), getImages()])
  // Breadcrumb label = the page title without the "| brand" suffix the Home crumb already carries.
  const crumbName = dict.landings[slug].title.split(' | ')[0] ?? dict.landings[slug].title
  const quick = {
    placeholder: dict.leadForm.phone,
    button: dict.hero.cta,
    sending: dict.leadForm.sending,
    error: dict.leadForm.error,
  }

  return (
    <>
      <StructuredData locale={lang} dict={dict} crumb={{ name: crumbName, slug }} />
      <SiteHeader locale={lang} nav={dict.nav} logo={images.logos.header} />
      <main>
        <LandingHero content={dict.landings[slug]} brand={dict.nav.brand} />
        <LeadForm content={dict.leadForm} locale={lang} />
        <Investment content={dict.investment} icons={images.investmentIcons} />
        {/* <Roi content={dict.roi} /> — temporarily hidden (2026-07-17) */}
        <LocationAdvantages content={dict.locationAdvantages} />
        <FlatsLazy content={dict.flats} images={images.flatImages} locale={lang} quick={quick} />
        <Faq content={dict.faq} />
        <Contact content={dict.contact} locale={lang} />
      </main>
      <SiteFooter content={dict.footer} locale={lang} logo={images.logos.footer} />
      <MobileDockLazy content={dict.mobileDock} />
      <RequestCallModalLazy content={dict.contact} locale={lang} />
      <LiveCameraModalLazy label={dict.nav.liveCamera} />
    </>
  )
}
