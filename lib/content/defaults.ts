import { HERO_SLIDES } from '@/features/hero-slider/hero-slider.content'
import { FLOORPLAN_IMAGES } from '@/features/floorplan/floorplan.content'
import { FLAT_IMAGES } from '@/features/flats/flats.content'
import { GALLERY_ITEMS } from '@/features/gallery/gallery.content'
import { INVESTMENT_ICONS } from '@/features/investment/investment.content'
import { VIDEO } from '@/features/video-band/video-band.content'
import type { SiteImages } from './types'

/** The shipped image set. Admin overrides are merged on top of these (see read.ts). */
export const DEFAULT_IMAGES: SiteImages = {
  heroSlides: [...HERO_SLIDES],
  floorplanImages: [...FLOORPLAN_IMAGES],
  flatImages: [...FLAT_IMAGES],
  galleryItems: GALLERY_ITEMS.map((i) => ({ src: i.src, category: i.category })),
  investmentIcons: [...INVESTMENT_ICONS],
  video: { youtubeId: VIDEO.youtubeId, image: VIDEO.image },
  logos: { header: '/theme/images/reverancelogo.png', footer: '/theme/images/logo-vertical.png' },
}
