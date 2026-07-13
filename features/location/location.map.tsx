'use client'

import { Defer } from '@/components/ui'

/**
 * The Google Maps embed only mounts once the location section nears the viewport,
 * so its third-party requests never compete with the initial mobile load. The
 * `aspect` wrapper reserves the exact space, so mounting causes no layout shift.
 */
export function LocationMap({ src, title }: { src: string; title: string }) {
  return (
    <Defer className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-foreground/10">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full"
      />
    </Defer>
  )
}
