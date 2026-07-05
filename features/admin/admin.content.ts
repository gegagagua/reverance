/** DOM id of the shared <datalist> of available image paths. */
export const ASSET_LIST_ID = 'admin-assets'

/** Friendly names + sidebar icons for the known content sections (dictionary keys). */
const META: Record<string, { label: string; icon: string }> = {
  meta: { label: 'SEO / Meta', icon: '🔎' },
  nav: { label: 'Navigation', icon: '🧭' },
  hero: { label: 'Hero', icon: '🏝️' },
  floorplan: { label: 'Floor Plan', icon: '📐' },
  flats: { label: 'Apartments', icon: '🏠' },
  gallery: { label: 'Gallery', icon: '🖼️' },
  overview: { label: 'Overview', icon: '✨' },
  investment: { label: 'Investment', icon: '📈' },
  location: { label: 'Location', icon: '📍' },
  faq: { label: 'FAQ', icon: '❓' },
  contact: { label: 'Contact', icon: '✉️' },
  cta: { label: 'CTA Bands', icon: '🔔' },
  video: { label: 'Video Band', icon: '🎬' },
  thankYou: { label: 'Thank You', icon: '🙏' },
  privacy: { label: 'Privacy', icon: '🔒' },
  mobileDock: { label: 'Mobile Dock', icon: '📱' },
  footer: { label: 'Footer', icon: '🧱' },
}

/** Turns a camelCase / snake key or array index into a readable label. */
export function humanize(key: string): string {
  if (/^\d+$/.test(key)) return `#${Number(key) + 1}`
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/[_-]/g, ' ')
    .replace(/^\w/, (c) => c.toUpperCase())
}

/** Display label for a section key (falls back to humanized key). */
export const sectionLabel = (key: string): string => META[key]?.label ?? humanize(key)

/** Sidebar icon for a section key (falls back to a generic dot). */
export const sectionIcon = (key: string): string => META[key]?.icon ?? '•'

/** Heuristic: does this string look like an image asset path we can preview? */
export const isImagePath = (value: string): boolean => /^\/.*\.(webp|avif|png|jpe?g|svg|gif)$/i.test(value)
