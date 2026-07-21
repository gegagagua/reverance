/** Precise pin coordinates for the two Batumi addresses, resolved from the
 * shared Google Maps links. Labels come from the localized dictionary at render
 * time; `url` opens the original Google Maps place from the popup. */
export const MAP_MARKERS = {
  project: {
    lat: 41.6172908,
    lng: 41.598081,
    url: 'https://maps.app.goo.gl/AkRFiBg4K2y6Fpi78',
  },
  sales: {
    lat: 41.6325669,
    lng: 41.6136097,
    url: 'https://maps.app.goo.gl/NPLS4FDukw3wjVGR9',
  },
} as const
