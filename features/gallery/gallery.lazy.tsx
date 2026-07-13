'use client'

import dynamic from 'next/dynamic'
import { Defer } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'
import type { GalleryItem } from './gallery.content'

// Below-the-fold island: its chunk (grid state + lightbox) loads on scroll.
const Gallery = dynamic(() => import('./gallery.ui').then((m) => m.Gallery), { ssr: false })

/** Scroll-deferred Gallery. `min-h` reserves space so the swap causes no shift. */
export function GalleryLazy(props: { content: Dictionary['gallery']; images: GalleryItem[] }) {
  return (
    <Defer className="min-h-[80vh]">
      <Gallery {...props} />
    </Defer>
  )
}
