'use client'

import type { ReactNode } from 'react'
import { useHeroSwipe } from '@/features/hero-slider'

/**
 * Client shell for the hero `<section>`. Hosts the mobile swipe handlers here —
 * the common ancestor of the slides and the overlay copy — so a swipe anywhere
 * in the hero advances the slide, not just one landing on the bare image.
 */
export function HeroShell({ children }: { children: ReactNode }) {
  const swipe = useHeroSwipe()

  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden text-white"
      {...swipe}
    >
      {children}
    </section>
  )
}
