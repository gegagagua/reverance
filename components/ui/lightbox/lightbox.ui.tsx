'use client'

import Image from 'next/image'
import { useLightboxControls } from './lightbox.logic'

export interface LightboxProps {
  images: readonly string[]
  index: number | null
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

const arrow =
  'absolute flex h-12 w-12 items-center justify-center rounded-full text-3xl text-white/80 transition-colors hover:bg-white/10'

/** Fullscreen image carousel (Fancybox-style). Renders nothing when closed. */
export function Lightbox({ images, index, onClose, onPrev, onNext }: LightboxProps) {
  const active = index !== null
  useLightboxControls({ active, onClose, onPrev, onNext })
  if (index === null) return null
  const src = images[index]
  if (!src) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-black/90 p-4"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full text-2xl text-white/80 transition-colors hover:bg-white/10"
      >
        ✕
      </button>
      <button
        type="button"
        aria-label="Previous"
        onClick={(e) => {
          e.stopPropagation()
          onPrev()
        }}
        className={`${arrow} left-3 sm:left-6`}
      >
        ‹
      </button>
      <Image
        key={src}
        src={src}
        alt=""
        width={1600}
        height={1066}
        sizes="90vw"
        onClick={(e) => e.stopPropagation()}
        className="h-auto max-h-[85vh] w-auto max-w-[90vw] animate-gallery-in rounded-lg object-contain"
      />
      <button
        type="button"
        aria-label="Next"
        onClick={(e) => {
          e.stopPropagation()
          onNext()
        }}
        className={`${arrow} right-3 sm:right-6`}
      >
        ›
      </button>
      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 text-sm text-white/60">
        {index + 1} / {images.length}
      </span>
    </div>
  )
}
