'use client'

import dynamic from 'next/dynamic'
import { Defer } from '@/components/ui'
import type { MapMarker } from './location.logic'

// ssr:false + Defer: the Leaflet loader chunk is fetched only once the section
// nears the viewport, never at first paint. The type-only import above is erased,
// so location.logic stays out of the initial bundle.
const MapCanvas = dynamic(() => import('./location.canvas').then((m) => m.MapCanvas), { ssr: false })

/**
 * Lazy, keyless Leaflet map with two brand-coloured pins (navy = project,
 * bronze = sales office). The `aspect` wrapper reserves the exact space, so
 * mounting the map causes no layout shift.
 */
export function LocationMap({ markers, title }: { markers: MapMarker[]; title: string }) {
  return (
    <Defer className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/10">
      <MapCanvas markers={markers} title={title} />
    </Defer>
  )
}
