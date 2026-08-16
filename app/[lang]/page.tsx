import { notFound } from 'next/navigation'
import { isLocale } from '@/i18n/config'
import { getDictionary } from '@/i18n/dictionaries'
import { getImages } from '@/lib/content/read'
import { StructuredData } from '@/features/structured-data'
import { SiteHeader } from '@/features/site-header'
import { Hero } from '@/features/hero'
import { LeadForm } from '@/features/lead-form'
import { Floorplan } from '@/features/floorplan'
import { About } from '@/features/about'
import { Overview } from '@/features/overview'
import { Investment } from '@/features/investment'
// Temporarily hidden per client (2026-07-17): ROI calc & construction progress
// not ready to publish yet. Restore when content is finalized.
// import { Roi } from '@/features/roi'
import { CtaBand } from '@/features/cta-band'
import { GalleryLazy } from '@/features/gallery/gallery.lazy'
// import { Progress } from '@/features/progress'
import { FlatsLazy } from '@/features/flats/flats.lazy'
import { Process } from '@/features/process'
import { Location } from '@/features/location'
import { Faq } from '@/features/faq'
import { Contact } from '@/features/contact'
import { VideoBand } from '@/features/video-band'
import { SiteFooter } from '@/features/site-footer'
import { MobileDockLazy } from '@/features/mobile-dock/mobile-dock.lazy'
import { RequestCallModalLazy } from '@/features/request-call/request-call.lazy'
import { LiveCameraModalLazy } from '@/features/live-camera/live-camera.lazy'

/** Server Component. Loads the locale dictionary and composes the single page in
 * the brief's order, with CTAs at each decision point (Hero → Investment →
 * Apartments → Location → Footer). */
export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLocale(lang)) notFound()
  const [dict, images] = await Promise.all([getDictionary(lang), getImages()])

  // Copy for the inline phone-capture on the sliders, assembled from existing
  // localized strings so no new dictionary keys are needed.
  const quick = {
    placeholder: dict.leadForm.phone,
    button: dict.hero.cta,
    sending: dict.leadForm.sending,
    error: dict.leadForm.error,
  }

  return (
    <>
      <StructuredData locale={lang} dict={dict} />
      <SiteHeader locale={lang} nav={dict.nav} logo={images.logos.header} />
      <main>
        <Hero content={dict.hero} slides={images.heroSlides} locale={lang} contact={dict.contact} />
        <LeadForm content={dict.leadForm} locale={lang} />
        <About content={dict.about} />
        <Floorplan content={dict.floorplan} />
        <Overview content={dict.overview} />
        <Investment content={dict.investment} icons={images.investmentIcons} />
        {/* <Roi content={dict.roi} /> — temporarily hidden (2026-07-17) */}
        <CtaBand content={dict.investment.cta} source="investment" />
        <GalleryLazy content={dict.gallery} />
        {/* <Progress content={dict.progress} /> — temporarily hidden (2026-07-17) */}
        <FlatsLazy content={dict.flats} images={images.flatImages} locale={lang} quick={quick} />
        <Process content={dict.process} />
        <CtaBand content={dict.cta.apartments} source="apartments" />
        <Location content={dict.location} />
        <CtaBand content={dict.cta.location} source="location" />
        <Faq content={dict.faq} />
        <Contact content={dict.contact} locale={lang} />
        <VideoBand content={dict.video} video={images.video} />
      </main>
      <SiteFooter content={dict.footer} locale={lang} logo={images.logos.footer} />
      <MobileDockLazy content={dict.mobileDock} />
      <RequestCallModalLazy content={dict.contact} locale={lang} />
      <LiveCameraModalLazy label={dict.nav.liveCamera} />
    </>
  )
}
