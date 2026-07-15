'use client'

import { useLocationMap, type MapMarker } from './location.logic'

/**
 * The interactive map surface. Split into its own module so `location.map`'s
 * `dynamic(ssr:false)` import keeps the Leaflet loader out of the initial page
 * JS — it only downloads once the location section nears the viewport.
 */
export function MapCanvas({ markers, title }: { markers: MapMarker[]; title: string }) {
  const ref = useLocationMap(markers)
  return <div ref={ref} role="application" aria-label={title} className="h-full w-full" />
}
