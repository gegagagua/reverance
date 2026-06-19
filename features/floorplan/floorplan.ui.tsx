import Image from 'next/image'
import { Container, Heading, Text } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Dictionary } from '@/i18n/dictionaries'
import { FLOORPLAN_IMAGES } from './floorplan.content'

/** Server Component, dark band. Alternating image/text rows (investment / Batumi). */
export function Floorplan({ content }: { content: Dictionary['floorplan'] }) {
  return (
    <section id="about" className="bg-surface py-24 text-white sm:py-28">
      <Container className="flex flex-col gap-16">
        {content.items.map((item, index) => (
          <div key={item.title} className="grid items-center gap-10 lg:grid-cols-2">
            <figure
              className={cn(
                'relative aspect-[4/3] overflow-hidden rounded-2xl',
                index % 2 === 1 && 'lg:order-2'
              )}
            >
              <Image
                src={FLOORPLAN_IMAGES[index] ?? FLOORPLAN_IMAGES[0] ?? ''}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </figure>
            <div className="flex flex-col gap-4">
              <Heading as="h2" size="lg" className="text-white">
                {item.title}
              </Heading>
              <Text className="text-white/70">{item.description}</Text>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}
