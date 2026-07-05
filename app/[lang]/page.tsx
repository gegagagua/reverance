import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getImages } from '@/lib/content/read'
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
import { RequestCallModal } from '@/features/request-call'

/** Server Component. Loads the locale dictionary and composes the single page in
 * the brief's order, with CTAs at each decision point (Hero → Investment →
 * Apartments → Location → Footer). */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const [dict, images] = await Promise.all([getDictionary(lang), getImages()])

  return (
    <>
      <SiteHeader locale={lang} nav={dict.nav} logo={images.logos.header} />
      <main>
        <Hero content={dict.hero} slides={images.heroSlides} />
        <Floorplan content={dict.floorplan} images={images.floorplanImages} />
        <Overview content={dict.overview} />
        <Investment content={dict.investment} icons={images.investmentIcons} />
        <CtaBand content={dict.investment.cta} source="investment" />
        <Gallery content={dict.gallery} images={images.galleryItems} />
        <Flats content={dict.flats} images={images.flatImages} />
        <CtaBand content={dict.cta.apartments} source="apartments" />
        <Location content={dict.location} />
        <CtaBand content={dict.cta.location} source="location" />
        <Faq content={dict.faq} />
        <Contact content={dict.contact} locale={lang} />
        <VideoBand content={dict.video} video={images.video} />
      </main>
      <SiteFooter content={dict.footer} locale={lang} logo={images.logos.footer} />
      <MobileDock content={dict.mobileDock} />
      <RequestCallModal content={dict.contact} locale={lang} />
    </>
  )
}
