import { create } from 'zustand'

interface HeaderState {
  scrolled: boolean
  mobileOpen: boolean
  setScrolled: (scrolled: boolean) => void
  toggleMobile: () => void
  closeMobile: () => void
}

/** Header chrome state: solid-on-scroll + mobile menu open/close. */
export const useHeaderStore = create<HeaderState>((set) => ({
  scrolled: false,
  mobileOpen: false,
  setScrolled: (scrolled) => set({ scrolled }),
  toggleMobile: () => set((s) => ({ mobileOpen: !s.mobileOpen })),
  closeMobile: () => set({ mobileOpen: false }),
}))
