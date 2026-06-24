'use client'

import Image from 'next/image'
import { cn } from '@/lib/cn'
import { HERO_SLIDES } from './hero-slider.content'
import { useHeroSlider } from './hero-slider.logic'

const ARROW =
  'absolute top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-2xl leading-none text-white backdrop-blur transition-colors hover:bg-white/40 md:flex'

/** Full-bleed cross-fading hero carousel: arrow buttons on desktop, swipe on mobile. */
export function HeroSlider() {
  const { index, setIndex, next, prev, hydrated, swipe } = useHeroSlider()

  return (
    <div className="absolute inset-0" {...swipe}>
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
      <button type="button" aria-label="Previous slide" onClick={prev} className={cn(ARROW, 'left-5')}>
        ‹
      </button>
      <button type="button" aria-label="Next slide" onClick={next} className={cn(ARROW, 'right-5')}>
        ›
      </button>
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
