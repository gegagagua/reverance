import { useEffect, useRef, useState } from 'react'
import type { TouchEvent } from 'react'
import { useHeroSliderStore } from './hero-slider.state'
import { HERO_SLIDES } from './hero-slider.content'

const COUNT = HERO_SLIDES.length
const go = (i: number) => useHeroSliderStore.getState().setIndex((i + COUNT) % COUNT)

/**
 * Subscribes to the active slide and auto-advances every 5s (cleared on unmount).
 * Exposes `next`/`prev` for the desktop arrow buttons and `swipe` touch handlers
 * for the mobile slider. `hydrated` flips true after first paint so the UI can
 * hold back the non-LCP slides until then — only slide 0 is fetched on load.
 */
export function useHeroSlider() {
  const index = useHeroSliderStore((s) => s.index)
  const setIndex = useHeroSliderStore((s) => s.setIndex)
  const [hydrated, setHydrated] = useState(false)
  const touchX = useRef<number | null>(null)

  const next = () => go(useHeroSliderStore.getState().index + 1)
  const prev = () => go(useHeroSliderStore.getState().index - 1)

  useEffect(() => {
    // Defer the non-LCP slides to a post-paint tick so they never race the hero.
    const t = window.setTimeout(() => setHydrated(true), 0)
    const id = setInterval(() => go(useHeroSliderStore.getState().index + 1), 5000)
    return () => {
      window.clearTimeout(t)
      clearInterval(id)
    }
  }, [])

  const swipe = {
    onTouchStart: (e: TouchEvent) => {
      touchX.current = e.touches[0]?.clientX ?? null
    },
    onTouchEnd: (e: TouchEvent) => {
      const end = e.changedTouches[0]?.clientX
      if (touchX.current === null || end === undefined) return
      const dx = end - touchX.current
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)()
      touchX.current = null
    },
  }

  return { index, setIndex, next, prev, hydrated, swipe }
}
