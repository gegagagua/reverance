import { useEffect } from 'react'
import { useHeaderStore } from './site-header.state'

/** Tracks scroll past the hero to toggle the transparent → solid header. */
export function useHeader() {
  const scrolled = useHeaderStore((s) => s.scrolled)
  const mobileOpen = useHeaderStore((s) => s.mobileOpen)
  const setScrolled = useHeaderStore((s) => s.setScrolled)
  const toggleMobile = useHeaderStore((s) => s.toggleMobile)
  const closeMobile = useHeaderStore((s) => s.closeMobile)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [setScrolled])

  return { scrolled, mobileOpen, toggleMobile, closeMobile }
}
