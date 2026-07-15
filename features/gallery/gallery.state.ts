import { create } from 'zustand'

interface GalleryState {
  lightbox: number | null
  openLightbox: (index: number) => void
  closeLightbox: () => void
  setLightbox: (index: number) => void
}

/** Open lightbox index into the flat gallery list (null = closed). */
export const useGalleryStore = create<GalleryState>((set) => ({
  lightbox: null,
  openLightbox: (lightbox) => set({ lightbox }),
  closeLightbox: () => set({ lightbox: null }),
  setLightbox: (lightbox) => set({ lightbox }),
}))
