'use client'

import Image from 'next/image'
import { VIDEO, embedUrl } from './video-band.content'
import { useDeferredVideo } from './video-band.logic'

/** Click-to-play leaf: shows a facade, then swaps in an inline YouTube iframe. */
export function VideoPlayer({ label }: { label: string }) {
  const { ready, playing, play } = useDeferredVideo()

  if (playing) {
    return (
      <iframe
        src={embedUrl(VIDEO.youtubeId)}
        title={label}
        allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full border-0"
      />
    )
  }

  return (
    <button
      type="button"
      onClick={play}
      disabled={!ready}
      aria-label={label}
      className="group block h-full w-full cursor-pointer"
    >
      <Image
        src={VIDEO.image}
        alt={label}
        fill
        className="object-cover opacity-80 transition-opacity group-hover:opacity-60"
        sizes="100vw"
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-black transition-transform group-hover:scale-110">
          <span className="ml-1 border-y-[10px] border-l-[16px] border-y-transparent border-l-black" />
        </span>
      </span>
      <span className="absolute bottom-6 left-0 right-0 text-center text-sm font-medium uppercase tracking-widest text-white">
        {label}
      </span>
    </button>
  )
}
