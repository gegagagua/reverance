'use client'

import { Container, buttonClass } from '@/components/ui'
import { cn } from '@/lib/cn'
import { useOpenRequestCall } from '@/features/request-call'
import { useOpenLiveCamera } from '@/features/live-camera'
import type { Dictionary } from '@/i18n/dictionaries'

/** The lg:hidden dropdown panel — nav links plus the Live Camera / call CTAs.
 * Split out of the header shell to keep each file under the 120-line cap. */
export function MobileMenu({ nav, closeMobile }: { nav: Dictionary['nav']; closeMobile: () => void }) {
  const openRequestCall = useOpenRequestCall()
  const openLiveCamera = useOpenLiveCamera()
  return (
    <nav className="border-t border-foreground/10 bg-white lg:hidden">
      <Container className="flex flex-col py-2">
        {nav.menu.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={closeMobile}
            className="py-3 text-sm font-medium uppercase tracking-widest text-foreground/80"
          >
            {item.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => {
            closeMobile()
            openLiveCamera()
          }}
          className="flex items-center gap-2 py-3 text-sm font-medium uppercase tracking-widest text-foreground/80"
        >
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          {nav.liveCamera}
        </button>
        <button
          type="button"
          onClick={() => {
            closeMobile()
            openRequestCall({ leadEvent: 'lead_form_sumbit_header', startEvent: 'lead_form_start_header' })
          }}
          className={cn('my-3', buttonClass({ variant: 'accent', size: 'sm' }))}
        >
          {nav.call}
        </button>
      </Container>
    </nav>
  )
}
