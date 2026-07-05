import { create } from 'zustand'

interface HeroSliderState {
  index: number
  count: number
  setIndex: (index: number) => void
  setCount: (count: number) => void
}

/** Active hero slide + slide count. Kept in a store so logic can advance it from
 * an interval and wrap correctly regardless of how many slides the admin set. */
export const useHeroSliderStore = create<HeroSliderState>((set) => ({
  index: 0,
  count: 1,
  setIndex: (index) => set({ index }),
  setCount: (count) => set({ count }),
}))
