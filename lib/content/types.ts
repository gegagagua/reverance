import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

/** One gallery tile: an asset path plus its category slug. */
export interface GalleryImage {
  src: string
  category: string
}

/** Locale-agnostic media used across the page. Every field is admin-editable. */
export interface SiteImages {
  heroSlides: string[]
  floorplanImages: string[]
  flatImages: string[]
  galleryItems: GalleryImage[]
  investmentIcons: string[]
  video: { youtubeId: string; image: string }
  logos: { header: string; footer: string }
}

/** A partial dictionary — only the fields the admin has changed. */
export type TextOverride = Partial<Dictionary>

/** The full editable payload persisted in MySQL (one JSON row). */
export interface ContentOverrides {
  text: Partial<Record<Locale, TextOverride>>
  images: Partial<SiteImages>
}
