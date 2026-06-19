'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'
import { HERO_SLIDES } from './hero-slider.content'
import { useHeroSlider } from './hero-slider.logic'

/** Full-bleed cross-fading background carousel for the hero. */
export function HeroSlider() {
  const { index, setIndex, hydrated } = useHeroSlider()

  return (
    <div className="absolute inset-0">
      {HERO_SLIDES.map((src, i) =>
        // Only the LCP slide loads up front; the rest mount after first paint.
        i === 0 || hydrated ? (
          <Image
            key={src}
            src={src}
            alt=""
            fill
            priority={i === 0}
            fetchPriority={i === 0 ? 'high' : 'auto'}
            loading={i === 0 ? 'eager' : 'lazy'}
            sizes="100vw"
            className={cn(
              'object-cover transition-opacity duration-1000',
              i === index ? 'opacity-100' : 'opacity-0'
            )}
          />
        ) : null
      )}
      <div className="absolute bottom-24 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {HERO_SLIDES.map((src, i) => (
          <button
            key={src}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              'h-2 rounded-full transition-all',
              i === index ? 'w-6 bg-accent' : 'w-2 bg-white/50'
            )}
          />
        ))}
      </div>
    </div>
  )
}
