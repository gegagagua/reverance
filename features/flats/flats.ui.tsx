'use client'

import Image from 'next/image'
import { Container, Heading } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Dictionary } from '@/i18n/dictionaries'
import { FLAT_IMAGES } from './flats.content'
import { useFlats } from './flats.logic'

/** One-at-a-time carousel of apartment types with prev/next + dots. */
export function Flats({ content }: { content: Dictionary['flats'] }) {
  const { index, setIndex, next, prev } = useFlats(content.items.length)

  return (
    <section id="flats" className="py-24 sm:py-28">
      <Container className="flex flex-col gap-10">
        <Heading as="h2" size="lg" className="text-center">
          {content.heading}
        </Heading>
        <div className="overflow-hidden rounded-2xl">
          <div
            className="flex transition-transform duration-500"
            style={{ transform: `translateX(-${index * 100}%)` }}
          >
            {content.items.map((flat, i) => (
              <figure key={flat.title} className="relative aspect-[16/9] w-full shrink-0">
                <Image
                  src={FLAT_IMAGES[i] ?? FLAT_IMAGES[0] ?? ''}
                  alt={flat.title}
                  fill
                  className="object-cover"
                  sizes="100vw"
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
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={prev}
            aria-label="Previous"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 hover:bg-foreground/5"
          >
            ‹
          </button>
          <div className="flex gap-2">
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
          <button
            type="button"
            onClick={next}
            aria-label="Next"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 hover:bg-foreground/5"
          >
            ›
          </button>
        </div>
      </Container>
    </section>
  )
}
