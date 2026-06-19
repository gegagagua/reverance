'use client'

import { useEffect, useState } from 'react'

/**
 * Defers the YouTube player so it activates only after every other component
 * has loaded: we wait for the window `load` event, then an idle callback.
 * The facade stays clickable immediately; `playing` swaps in the iframe.
 */
export function useDeferredVideo() {
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    let idle: number
    const arm = () => {
      const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 200))
      idle = ric(() => setReady(true)) as unknown as number
    }
    if (document.readyState === 'complete') arm()
    else window.addEventListener('load', arm, { once: true })
    return () => {
      window.removeEventListener('load', arm)
      const cic = window.cancelIdleCallback ?? window.clearTimeout
      if (idle) cic(idle)
    }
  }, [])

  return { ready, playing, play: () => setPlaying(true) }
}
