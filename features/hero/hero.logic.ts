'use client'

import { useHeroSliderStore } from '@/features/hero-slider/hero-slider.state'

/** The hero copy + CTA are hidden on the first slide so it opens on the image alone. */
export function useHeroCopyVisible() {
  return useHeroSliderStore((s) => s.index !== 0)
}

/** The embedded lead form is shown only on the first slide. */
export function useHeroFormVisible() {
  return useHeroSliderStore((s) => s.index === 0)
}
