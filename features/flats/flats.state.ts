import { create } from 'zustand'

interface FlatsState {
  index: number
  setIndex: (index: number) => void
}

export const useFlatsStore = create<FlatsState>((set) => ({
  index: 0,
  setIndex: (index) => set({ index }),
}))
