'use client'

import { useEffect, useRef } from 'react'

const DISTANCE = 40 // px a horizontal drag must travel to count as a swipe
const LOCK = 10 // px of movement before the gesture commits to an axis

/**
 * Horizontal swipe with axis locking. Returns a ref to attach to the swipe
 * target. Once a drag is clearly horizontal it `preventDefault`s the (non-passive)
 * touchmove so the page never scrolls vertically mid-swipe; clearly-vertical drags
 * fall through to normal page scrolling. `onSwipe(1)` is a left swipe (next),
 * `onSwipe(-1)` a right swipe (prev).
 */
export function useSwipe<T extends HTMLElement = HTMLElement>(onSwipe: (dir: 1 | -1) => void) {
  const ref = useRef<T>(null)
  const cb = useRef(onSwipe)
  useEffect(() => {
    cb.current = onSwipe
  }, [onSwipe])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let start: { x: number; y: number } | null = null
    let axis: 'x' | 'y' | null = null

    const onStart = (e: TouchEvent) => {
      const t = e.touches[0]
      start = t ? { x: t.clientX, y: t.clientY } : null
      axis = null
    }
    const onMove = (e: TouchEvent) => {
      const t = e.touches[0]
      if (!start || !t) return
      const dx = t.clientX - start.x
      const dy = t.clientY - start.y
      if (!axis && Math.abs(dx) + Math.abs(dy) > LOCK) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y'
      if (axis === 'x') e.preventDefault()
    }
    const onEnd = (e: TouchEvent) => {
      const end = e.changedTouches[0]
      if (start && end && axis === 'x' && Math.abs(end.clientX - start.x) > DISTANCE) {
        cb.current(end.clientX - start.x < 0 ? 1 : -1)
      }
      start = null
      axis = null
    }

    el.addEventListener('touchstart', onStart, { passive: true })
    el.addEventListener('touchmove', onMove, { passive: false })
    el.addEventListener('touchend', onEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onStart)
      el.removeEventListener('touchmove', onMove)
      el.removeEventListener('touchend', onEnd)
    }
  }, [])

  return ref
}
