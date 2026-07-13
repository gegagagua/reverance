import { create } from 'zustand'

interface HeroSliderState {
  index: number
  count: number
  paused: boolean
  setIndex: (index: number) => void
  setCount: (count: number) => void
  setPaused: (paused: boolean) => void
}

/** Active hero slide + slide count. Kept in a store so logic can advance it from
 * an interval and wrap correctly regardless of how many slides the admin set.
 * `paused` freezes the auto-advance while the visitor is on the embedded form. */
export const useHeroSliderStore = create<HeroSliderState>((set) => ({
  index: 0,
  count: 1,
  paused: false,
  setIndex: (index) => set({ index }),
  setCount: (count) => set({ count }),
  setPaused: (paused) => set({ paused }),
}))
