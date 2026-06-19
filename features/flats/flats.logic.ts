import { useCallback } from 'react'
import { useFlatsStore } from './flats.state'

/** Carousel index logic. `count` wraps prev/next around the slide set. */
export function useFlats(count: number) {
  const index = useFlatsStore((s) => s.index)
  const setIndex = useFlatsStore((s) => s.setIndex)

  const next = useCallback(() => {
    setIndex((useFlatsStore.getState().index + 1) % count)
  }, [setIndex, count])

  const prev = useCallback(() => {
    setIndex((useFlatsStore.getState().index - 1 + count) % count)
  }, [setIndex, count])

  return { index, setIndex, next, prev }
}
