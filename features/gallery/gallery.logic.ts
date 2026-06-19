import { useCallback, useMemo } from 'react'
import { useGalleryStore } from './gallery.state'
import { GALLERY_ITEMS } from './gallery.content'

/** Derives the visible set from the filter and exposes lightbox navigation. */
export function useGallery() {
  const filter = useGalleryStore((s) => s.filter)
  const lightbox = useGalleryStore((s) => s.lightbox)
  const setFilter = useGalleryStore((s) => s.setFilter)
  const openLightbox = useGalleryStore((s) => s.openLightbox)
  const closeLightbox = useGalleryStore((s) => s.closeLightbox)
  const setLightbox = useGalleryStore((s) => s.setLightbox)

  const items = useMemo(
    () => (filter === '*' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((item) => item.category === filter)),
    [filter]
  )
  const sources = useMemo(() => items.map((item) => item.src), [items])

  const step = useCallback(
    (delta: number) => {
      const current = useGalleryStore.getState().lightbox
      if (current === null || sources.length === 0) return
      setLightbox((current + delta + sources.length) % sources.length)
    },
    [setLightbox, sources.length]
  )
  const next = useCallback(() => step(1), [step])
  const prev = useCallback(() => step(-1), [step])

  return { filter, items, sources, lightbox, setFilter, openLightbox, closeLightbox, next, prev }
}
