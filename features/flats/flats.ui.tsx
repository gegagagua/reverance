'use client'

import Image from 'next/image'
import { Container, Heading } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Dictionary } from '@/i18n/dictionaries'
import { FLAT_IMAGES } from './flats.content'
import { useFlats } from './flats.logic'

const ARROW =
  'absolute top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-foreground/10 bg-white text-2xl leading-none text-foreground shadow-md transition-colors hover:bg-foreground/5 md:flex'

/** One-at-a-time carousel of apartment types: overlaid arrows on desktop,
 * swipe on mobile, with dot indicators below. */
export function Flats({ content }: { content: Dictionary['flats'] }) {
  const { index, setIndex, next, prev, swipeRef } = useFlats(content.items.length)

  return (
    <section id="flats" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-10">
        <Heading as="h2" size="lg" className="text-center">
          {content.heading}
        </Heading>
        <div ref={swipeRef} className="relative mx-auto w-full max-w-2xl">
          <div className="overflow-hidden rounded-2xl">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {content.items.map((flat, i) => (
                <figure key={flat.title} className="relative aspect-square w-full shrink-0">
                  <Image
                    src={FLAT_IMAGES[i] ?? FLAT_IMAGES[0] ?? ''}
                    alt={flat.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <span className="text-2xl font-medium">{flat.title}</span>
                    <span className="text-sm text-white/80">{flat.area}</span>
                    <span className="text-sm text-accent">
                      {content.priceLabel}: {flat.price}
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className={cn(ARROW, 'left-0 -translate-x-1/2 lg:-left-3')}
          >
            ‹
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className={cn(ARROW, 'right-0 translate-x-1/2 lg:-right-3')}
          >
            ›
          </button>
        </div>
        <div className="flex items-center justify-center gap-2">
          {content.items.map((flat, i) => (
            <button
              key={flat.title}
              type="button"
              aria-label={flat.title}
              onClick={() => setIndex(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === index ? 'w-6 bg-accent' : 'w-2 bg-foreground/20'
              )}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
