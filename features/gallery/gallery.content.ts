export interface GalleryItem {
  src: string
  category: string
}

/** Gallery images (hardcoded, not admin-managed) tagged by category slug —
 * matches dictionary gallery.categories. Assets live in public/theme/gallery. */
const img = (file: string, category: string): GalleryItem => ({
  src: `/theme/gallery/${file}`,
  category,
})

export const GALLERY_ITEMS: readonly GalleryItem[] = [
  img('ExtCam_02_R1.webp', 'exterior'),
  img('ExtCam_03_R1.webp', 'exterior'),
  img('ExtCam_04_R1.webp', 'exterior'),
  img('3.webp', 'exterior'),
  img('corona-night.webp', 'exterior'),
  img('1.webp', 'interior'),
  img('2.webp', 'interior'),
  img('333.webp', 'interior'),
  img('Pool_2.webp', 'facilities'),
  img('Pool_3.webp', 'facilities'),
  img('Gym.webp', 'facilities'),
  img('Sauna.webp', 'facilities'),
  img('Child_Zone_r2.webp', 'facilities'),
  img('Cam13_final.webp', 'facilities'),
  img('c0020000.webp', 'facilities'),
]
