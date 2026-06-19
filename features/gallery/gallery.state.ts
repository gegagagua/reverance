import { create } from 'zustand'

interface GalleryState {
  filter: string
  lightbox: number | null
  setFilter: (filter: string) => void
  openLightbox: (index: number) => void
  closeLightbox: () => void
  setLightbox: (index: number) => void
}

/** Active gallery filter (`'*'` = all) + open lightbox index (null = closed). */
export const useGalleryStore = create<GalleryState>((set) => ({
  filter: '*',
  lightbox: null,
  // Changing filter closes the lightbox so its index can't point at a stale item.
  setFilter: (filter) => set({ filter, lightbox: null }),
  openLightbox: (lightbox) => set({ lightbox }),
  closeLightbox: () => set({ lightbox: null }),
  setLightbox: (lightbox) => set({ lightbox }),
}))
