export interface GalleryItem {
  src: string
  category: string
}

/** Gallery images tagged by category slug (matches dictionary gallery.categories). */
const make = (n: number, category: string): GalleryItem => ({
  src: `/theme/images/gallery/g${n}.webp`,
  category,
})

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  make(1, 'exterior'),
  make(2, 'facilities'),
  make(3, 'interior'),
  make(4, 'interior'),
  make(5, 'interior'),
  make(6, 'facilities'),
  make(7, 'facilities'),
  make(8, 'facilities'),
  make(9, 'facilities'),
  make(10, 'facilities'),
  make(11, 'interior'),
  make(12, 'exterior'),
  make(13, 'exterior'),
  make(14, 'exterior'),
  make(15, 'facilities'),
  make(16, 'exterior'),
  make(17, 'facilities'),
  make(18, 'facilities'),
  make(19, 'interior'),
  make(20, 'facilities'),
  make(21, 'exterior'),
  make(22, 'interior'),
  make(23, 'facilities'),
  make(24, 'exterior'),
  make(25, 'exterior'),
  make(26, 'facilities'),
]
