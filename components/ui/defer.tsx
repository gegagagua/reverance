'use client'

import type { ReactNode } from 'react'
import { useInView } from '@/lib/use-in-view'

/**
 * Renders `children` only once the wrapper nears the viewport, so a below-the-fold
 * island's client chunk (paired with a `dynamic(ssr:false)` child) is fetched and
 * hydrated on approach instead of at first paint. Pass a sizing `className`
 * (e.g. `min-h-[600px]` or an aspect ratio) to reserve space and avoid layout shift.
 */
export function Defer({
  children,
  className,
  rootMargin,
}: {
  children: ReactNode
  className?: string
  rootMargin?: string
}) {
  const { ref, inView } = useInView<HTMLDivElement>(rootMargin)
  return (
    <div ref={ref} className={className}>
      {inView ? children : null}
    </div>
  )
}
