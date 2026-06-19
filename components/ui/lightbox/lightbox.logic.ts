import { useEffect } from 'react'

interface Options {
  active: boolean
  onClose: () => void
  onPrev: () => void
  onNext: () => void
}

/** Binds Esc / ← / → and locks body scroll while the lightbox is open. */
export function useLightboxControls({ active, onClose, onPrev, onNext }: Options) {
  useEffect(() => {
    if (!active) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      else if (event.key === 'ArrowLeft') onPrev()
      else if (event.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [active, onClose, onPrev, onNext])
}
