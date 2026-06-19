export interface GalleryItem {
  src: string
  category: string
}

/** Gallery images tagged by category slug (matches dictionary gallery.categories). */
const make = (n: number, category: string): GalleryItem => ({
  src: `/theme/images/gallery/l${n}.webp`,
  category,
})

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  make(1, 'exterior'),
  make(2, 'exterior'),
  make(3, 'exterior'),
  make(4, 'exterior'),
  make(5, 'interior'),
  make(6, 'interior'),
  make(7, 'interior'),
  make(8, 'interior'),
  make(9, 'interior'),
  make(10, 'facilities'),
  make(11, 'facilities'),
  make(12, 'facilities'),
  make(13, 'facilities'),
  make(14, 'facilities'),
  make(15, 'facilities'),
]
