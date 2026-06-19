import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { SiteHeader } from '@/features/site-header'
import { Hero } from '@/features/hero'
import { Floorplan } from '@/features/floorplan'
import { Overview } from '@/features/overview'
import { Investment } from '@/features/investment'
import { CtaBand } from '@/features/cta-band'
import { Gallery } from '@/features/gallery'
import { Flats } from '@/features/flats'
import { Location } from '@/features/location'
import { Faq } from '@/features/faq'
import { Contact } from '@/features/contact'
import { VideoBand } from '@/features/video-band'
import { SiteFooter } from '@/features/site-footer'
import { MobileDock } from '@/features/mobile-dock'

/** Server Component. Loads the locale dictionary and composes the single page in
 * the brief's order, with CTAs at each decision point (Hero → Investment →
 * Apartments → Location → Footer). */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const dict = await getDictionary(lang)

  return (
    <>
      <SiteHeader locale={lang} nav={dict.nav} />
      <main>
        <Hero content={dict.hero} />
        <Floorplan content={dict.floorplan} />
        <Overview content={dict.overview} />
        <Investment content={dict.investment} />
        <CtaBand content={dict.investment.cta} source="investment" />
        <Gallery content={dict.gallery} />
        <Flats content={dict.flats} />
        <CtaBand content={dict.cta.apartments} source="apartments" />
        <Location content={dict.location} />
        <CtaBand content={dict.cta.location} source="location" />
        <Faq content={dict.faq} />
        <Contact content={dict.contact} locale={lang} />
        <VideoBand content={dict.video} />
      </main>
      <SiteFooter content={dict.footer} locale={lang} />
      <MobileDock content={dict.mobileDock} />
    </>
  )
}
