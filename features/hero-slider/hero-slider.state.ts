import { create } from 'zustand'

interface HeroSliderState {
  index: number
  setIndex: (index: number) => void
}

/** Active hero slide. Kept in a store so logic can advance it from an interval. */
export const useHeroSliderStore = create<HeroSliderState>((set) => ({
  index: 0,
  setIndex: (index) => set({ index }),
}))
