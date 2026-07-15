import { useCallback, useMemo } from 'react'
import { useGalleryStore } from './gallery.state'
import { GALLERY_ITEMS, type GalleryItem } from './gallery.content'

/** A gallery item plus its position in the flat list (used to open the lightbox). */
export interface IndexedItem extends GalleryItem {
  index: number
}

/** Groups the hardcoded items by category and exposes lightbox navigation over
 * the full flat list. Ordering follows GALLERY_ITEMS. */
export function useGallery() {
  const lightbox = useGalleryStore((s) => s.lightbox)
  const openLightbox = useGalleryStore((s) => s.openLightbox)
  const closeLightbox = useGalleryStore((s) => s.closeLightbox)
  const setLightbox = useGalleryStore((s) => s.setLightbox)

  const sources = useMemo(() => GALLERY_ITEMS.map((item) => item.src), [])
  const groups = useMemo(() => {
    const map: Record<string, IndexedItem[]> = {}
    GALLERY_ITEMS.forEach((item, index) => {
      ;(map[item.category] ??= []).push({ ...item, index })
    })
    return map
  }, [])

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

  return { groups, sources, lightbox, openLightbox, closeLightbox, next, prev }
}
