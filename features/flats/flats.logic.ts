import { useCallback } from 'react'
import { useSwipe } from '@/lib/use-swipe'
import { useFlatsStore } from './flats.state'

/** Carousel index logic. `count` wraps prev/next around the slide set; `swipeRef`
 * is the mobile swipe target (desktop uses the overlaid arrow buttons). The swipe
 * is axis-locked, so a horizontal drag never scrolls the page vertically. */
export function useFlats(count: number) {
  const index = useFlatsStore((s) => s.index)
  const setIndex = useFlatsStore((s) => s.setIndex)

  const next = useCallback(() => {
    setIndex((useFlatsStore.getState().index + 1) % count)
  }, [setIndex, count])

  const prev = useCallback(() => {
    setIndex((useFlatsStore.getState().index - 1 + count) % count)
  }, [setIndex, count])

  const swipeRef = useSwipe<HTMLDivElement>((dir) => (dir > 0 ? next() : prev()))

  return { index, setIndex, next, prev, swipeRef }
}
