'use client'

import { useEffect, useState } from 'react'
import { useSwipe } from '@/lib/use-swipe'
import { useHeroSliderStore } from './hero-slider.state'

// Wrap against the current slide count (set from the admin-editable slide list).
const go = (i: number) => {
  const { count, setIndex } = useHeroSliderStore.getState()
  setIndex(((i % count) + count) % count)
}
const next = () => go(useHeroSliderStore.getState().index + 1)
const prev = () => go(useHeroSliderStore.getState().index - 1)

/**
 * Subscribes to the active slide and auto-advances every 8s (cleared on unmount),
 * but skips advancing while `paused` — set when the visitor hovers/focuses the
 * embedded lead form. Exposes `next`/`prev` for the desktop arrow buttons.
 * `hydrated` flips true after first paint so the UI can hold back the non-LCP
 * slides until then — only slide 0 is fetched on load.
 */
export function useHeroSlider(count: number) {
  const index = useHeroSliderStore((s) => s.index)
  const setIndex = useHeroSliderStore((s) => s.setIndex)
  const setCount = useHeroSliderStore((s) => s.setCount)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => setCount(count), [count, setCount])

  useEffect(() => {
    // Defer the non-LCP slides to a post-paint tick so they never race the hero.
    const t = window.setTimeout(() => setHydrated(true), 0)
    const id = setInterval(() => {
      if (useHeroSliderStore.getState().paused) return
      go(useHeroSliderStore.getState().index + 1)
    }, 8000)
    return () => {
      window.clearTimeout(t)
      clearInterval(id)
    }
  }, [])

  return { index, setIndex, next, prev, hydrated }
}

/**
 * Pause handlers for the embedded hero form: freeze the auto-advance while the
 * pointer is over it or a field is focused, and resume on leave/blur. Bind on the
 * form wrapper — React's focus/blur bubble, so nested inputs are covered too.
 */
export function useHeroSliderPause() {
  const setPaused = useHeroSliderStore((s) => s.setPaused)
  return {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: () => setPaused(false),
  }
}

/**
 * Mobile swipe for the hero. Returns a ref mounted on the `<section>` (a common
 * ancestor of the slides and the overlay copy) so swipes anywhere in the hero
 * advance the slide. Axis-locked, so a horizontal swipe never scrolls the page.
 */
export function useHeroSwipe() {
  return useSwipe((dir) => {
    // Ignore swipes while the visitor is on the form (paused) so a stray
    // horizontal drag can't slide the lead form out from under them.
    if (useHeroSliderStore.getState().paused) return
    if (dir > 0) next()
    else prev()
  })
}
