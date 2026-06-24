import { useCallback, useRef } from 'react'
import type { TouchEvent } from 'react'
import { useFlatsStore } from './flats.state'

/** Carousel index logic. `count` wraps prev/next around the slide set; `swipe`
 * provides the mobile touch handlers (desktop uses the overlaid arrow buttons). */
export function useFlats(count: number) {
  const index = useFlatsStore((s) => s.index)
  const setIndex = useFlatsStore((s) => s.setIndex)
  const touchX = useRef<number | null>(null)

  const next = useCallback(() => {
    setIndex((useFlatsStore.getState().index + 1) % count)
  }, [setIndex, count])

  const prev = useCallback(() => {
    setIndex((useFlatsStore.getState().index - 1 + count) % count)
  }, [setIndex, count])

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

  return { index, setIndex, next, prev, swipe }
}
