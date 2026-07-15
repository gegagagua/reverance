'use client'

import Image from 'next/image'
import { Container, Heading, Lightbox, Section } from '@/components/ui'
import type { Dictionary } from '@/i18n/dictionaries'
import { useGallery } from './gallery.logic'

/** Images grouped under a heading per category; clicking a tile opens the
 * lightbox carousel over the full set. Images are hardcoded (gallery.content). */
export function Gallery({ content }: { content: Dictionary['gallery'] }) {
  const { groups, sources, lightbox, openLightbox, closeLightbox, next, prev } = useGallery()

  return (
    <Section id="gallery">
      <Container className="flex flex-col gap-12">
        <Heading as="h2" size="lg" className="text-center">
          {content.heading}
        </Heading>
        {content.categories.map((category) => {
          const items = groups[category.slug] ?? []
          if (items.length === 0) return null
          return (
            <div key={category.slug} className="flex flex-col gap-5">
              <Heading as="h3" size="md">
                {category.name}
              </Heading>
              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {items.map((item, i) => (
                  <li key={item.src} style={{ animationDelay: `${i * 45}ms` }} className="animate-gallery-in">
                    <button
                      type="button"
                      onClick={() => openLightbox(item.index)}
                      aria-label={`Open ${category.name} image ${i + 1}`}
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
            </div>
          )
        })}
      </Container>
      <Lightbox images={sources} index={lightbox} onClose={closeLightbox} onPrev={prev} onNext={next} />
    </Section>
  )
}
