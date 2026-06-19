import { useEffect } from 'react'
import { useHeroSliderStore } from './hero-slider.state'
import { HERO_SLIDES } from './hero-slider.content'

/** Subscribes to the active slide and auto-advances every 5s (cleared on unmount). */
export function useHeroSlider() {
  const index = useHeroSliderStore((s) => s.index)
  const setIndex = useHeroSliderStore((s) => s.setIndex)

  useEffect(() => {
    const id = setInterval(() => {
      const next = (useHeroSliderStore.getState().index + 1) % HERO_SLIDES.length
      setIndex(next)
    }, 5000)
    return () => clearInterval(id)
  }, [setIndex])

  return { index, setIndex }
}
