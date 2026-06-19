'use client'

import { Container, Heading, Text, buttonClass } from '@/components/ui'
import { cn } from '@/lib/cn'
import type { Dictionary } from '@/i18n/dictionaries'
import { useHeroCopyVisible } from './hero.logic'

/** Hero overlay copy + CTA. Faded out on the first slide (image-only intro). */
export function HeroCopy({ content }: { content: Dictionary['hero'] }) {
  const visible = useHeroCopyVisible()

  return (
    <Container
      aria-hidden={!visible}
      className={cn(
        'relative z-10 w-full pb-24 pt-28 transition-opacity duration-700',
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      )}
    >
      <div className="flex max-w-3xl flex-col gap-6">
        <span className="text-sm uppercase tracking-widest text-white/80">{content.eyebrow}</span>
        <Heading as="h1" size="xl" className="text-white">
          {content.title}
        </Heading>
        <Text className="max-w-2xl text-white/80">{content.subtitle}</Text>
        <ul className="flex flex-wrap gap-3 text-sm text-white/90">
          <li className="rounded-full border border-white/25 px-4 py-1.5">{content.location}</li>
          <li className="rounded-full border border-white/25 px-4 py-1.5">{content.completion}</li>
        </ul>
        <a
          href="#contact"
          data-cta="hero"
          className={cn('mt-2 w-fit', buttonClass({ variant: 'accent', size: 'lg' }))}
        >
          {content.cta}
        </a>
      </div>
    </Container>
  )
}
