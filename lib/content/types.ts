import type { Locale } from '@/i18n/config'
import type { Dictionary } from '@/i18n/dictionaries'

/** Locale-agnostic media used across the page. Every field is admin-editable.
 * (Gallery images are intentionally excluded — they are hardcoded for speed;
 * see features/gallery/gallery.content.ts.) */
export interface SiteImages {
  heroSlides: string[]
  flatImages: string[]
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
