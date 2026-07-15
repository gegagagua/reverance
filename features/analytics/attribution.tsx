'use client'

import { useEffect } from 'react'
import { captureUtm } from '@/lib/utm'

/**
 * Persists this visit's UTM / click-id params to sessionStorage on first load,
 * before any in-page navigation strips them from the URL. Renders nothing; every
 * lead form later reads them back so ad traffic stays attributed.
 */
export function AttributionCapture() {
  useEffect(() => {
    captureUtm()
  }, [])
  return null
}
