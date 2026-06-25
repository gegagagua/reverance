'use client'

import { useEffect, useState } from 'react'
import { useSwipe } from '@/lib/use-swipe'
import { useHeroSliderStore } from './hero-slider.state'
import { HERO_SLIDES } from './hero-slider.content'

const COUNT = HERO_SLIDES.length
const go = (i: number) => useHeroSliderStore.getState().setIndex((i + COUNT) % COUNT)
const next = () => go(useHeroSliderStore.getState().index + 1)
const prev = () => go(useHeroSliderStore.getState().index - 1)

/**
 * Subscribes to the active slide and auto-advances every 5s (cleared on unmount).
 * Exposes `next`/`prev` for the desktop arrow buttons. `hydrated` flips true after
 * first paint so the UI can hold back the non-LCP slides until then — only slide 0
 * is fetched on load.
 */
export function useHeroSlider() {
  const index = useHeroSliderStore((s) => s.index)
  const setIndex = useHeroSliderStore((s) => s.setIndex)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Defer the non-LCP slides to a post-paint tick so they never race the hero.
    const t = window.setTimeout(() => setHydrated(true), 0)
    const id = setInterval(() => go(useHeroSliderStore.getState().index + 1), 5000)
    return () => {
      window.clearTimeout(t)
      clearInterval(id)
    }
  }, [])

  return { index, setIndex, next, prev, hydrated }
}

/**
 * Mobile swipe for the hero. Returns a ref mounted on the `<section>` (a common
 * ancestor of the slides and the overlay copy) so swipes anywhere in the hero
 * advance the slide. Axis-locked, so a horizontal swipe never scrolls the page.
 */
export function useHeroSwipe() {
  return useSwipe((dir) => (dir > 0 ? next() : prev()))
}
