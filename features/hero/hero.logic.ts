'use client'

import { useHeroSliderStore } from '@/features/hero-slider/hero-slider.state'

/** The hero copy + CTA lead on the first slide; the second swaps them for the form. */
export function useHeroCopyVisible() {
  return useHeroSliderStore((s) => s.index !== 1)
}

/** The embedded lead form is shown only on the second slide. */
export function useHeroFormVisible() {
  return useHeroSliderStore((s) => s.index === 1)
}
