'use client'

import Image from 'next/image'
import { Container, Heading, Lightbox, Section } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Dictionary } from '@/i18n/dictionaries'
import { useGallery } from './gallery.logic'

/** Filterable image grid; clicking a tile opens the lightbox carousel. */
export function Gallery({ content }: { content: Dictionary['gallery'] }) {
  const { filter, items, sources, lightbox, setFilter, openLightbox, closeLightbox, next, prev } =
    useGallery()
  const filters = [{ slug: '*', name: content.all }, ...content.categories]

  return (
    <Section id="gallery">
      <Container className="flex flex-col gap-10">
        <Heading as="h2" size="lg" className="text-center">
          {content.heading}
        </Heading>
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.slug}
              type="button"
              onClick={() => setFilter(f.slug)}
              className={cn(
                'rounded-full px-4 py-1.5 text-sm transition-colors',
                filter === f.slug
                  ? 'bg-accent text-white'
                  : 'border border-foreground/15 hover:bg-foreground/5'
              )}
            >
              {f.name}
            </button>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={`${filter}-${item.src}`}
              style={{ animationDelay: `${index * 45}ms` }}
              className="animate-gallery-in"
            >
              <button
                type="button"
                onClick={() => openLightbox(index)}
                aria-label={`Open image ${index + 1}`}
                className="group relative block aspect-square w-full overflow-hidden rounded-xl"
              >
                <Image
                  src={item.src}
                  alt=""
                  fill
                  quality={65}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
              </button>
            </li>
          ))}
        </ul>
      </Container>
      <Lightbox images={sources} index={lightbox} onClose={closeLightbox} onPrev={prev} onNext={next} />
    </Section>
  )
}
