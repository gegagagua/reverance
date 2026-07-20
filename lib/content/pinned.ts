import { DEFAULT_IMAGES } from './defaults'
import type { SiteImages } from './types'

/** hero-2 lives at heroSlides[1] — it is hardcoded for brand consistency and to
 * keep its pre-optimized asset weight, so admin cannot swap it. */
const HERO2_INDEX = 1

/** Image slots locked in the admin editor (dot-path under SiteImages). */
export const PINNED_IMAGE_PATHS: readonly string[] = [`heroSlides.${HERO2_INDEX}`]

/** Is this SiteImages dot-path a pinned (hardcoded, non-editable) slot? */
export const isPinnedImage = (dotPath: string): boolean => PINNED_IMAGE_PATHS.includes(dotPath)

/** Force every pinned slot back to its shipped default, so a saved admin override
 * can never change it on the live site. */
export function applyPinnedImages(images: SiteImages): SiteImages {
  const pinned = DEFAULT_IMAGES.heroSlides[HERO2_INDEX]
  if (pinned === undefined) return images
  const heroSlides = [...images.heroSlides]
  heroSlides[HERO2_INDEX] = pinned
  return { ...images, heroSlides }
}
