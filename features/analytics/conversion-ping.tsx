'use client'

import { useEffect } from 'react'
import { track, type TrackEvent } from '@/lib/track'

/**
 * Fires a single conversion event once on mount. Drop it on a destination page
 * (e.g. Thank-You) to record the visit. Renders nothing.
 */
export function ConversionPing({ event }: { event: TrackEvent }) {
  useEffect(() => {
    track(event)
  }, [event])
  return null
}
