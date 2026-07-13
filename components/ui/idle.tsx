'use client'

import { type ReactElement, useEffect, useState } from 'react'

/**
 * Defers mounting `children` until the browser is idle (or a short fallback
 * timeout), keeping always-present-but-not-first-paint widgets — the request-call
 * modal, the floating dock — out of the critical hydration path. Paired with a
 * `dynamic(ssr:false)` child, their JS chunk loads after the page is interactive.
 */
export function Idle({ children }: { children: ReactElement }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const ric = window.requestIdleCallback
    if (ric) {
      const id = ric(() => setReady(true))
      return () => window.cancelIdleCallback?.(id)
    }
    const t = window.setTimeout(() => setReady(true), 200)
    return () => window.clearTimeout(t)
  }, [])

  return ready ? children : null
}
