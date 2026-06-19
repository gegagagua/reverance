import { useEffect, useState } from 'react'
import { useHeroSliderStore } from './hero-slider.state'
import { HERO_SLIDES } from './hero-slider.content'

/**
 * Subscribes to the active slide and auto-advances every 5s (cleared on unmount).
 * `hydrated` flips true after first paint so the UI can hold back the non-LCP
 * slides until then — only slide 0 is fetched on initial load.
 */
export function useHeroSlider() {
  const index = useHeroSliderStore((s) => s.index)
  const setIndex = useHeroSliderStore((s) => s.setIndex)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    // Defer the non-LCP slides to a post-paint tick so they never race the hero.
    const t = window.setTimeout(() => setHydrated(true), 0)
    const id = setInterval(() => {
      const next = (useHeroSliderStore.getState().index + 1) % HERO_SLIDES.length
      setIndex(next)
    }, 5000)
    return () => {
      window.clearTimeout(t)
      clearInterval(id)
    }
  }, [setIndex])

  return { index, setIndex, hydrated }
}
