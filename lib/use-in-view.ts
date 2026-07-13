'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * One-shot IntersectionObserver: flips `inView` true the first time the ref
 * nears the viewport, then disconnects. `rootMargin` pre-triggers the load
 * before the element is actually visible so deferred content is ready on time.
 * Falls back to eager (true) where IntersectionObserver is unavailable.
 */
export function useInView<T extends Element>(rootMargin = '300px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      const t = window.setTimeout(() => setInView(true), 0)
      return () => window.clearTimeout(t)
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin])

  return { ref, inView }
}
