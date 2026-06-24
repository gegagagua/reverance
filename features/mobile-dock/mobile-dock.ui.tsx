'use client'

import { cn } from '@/lib/cn'
import { track } from '@/lib/track'
import type { Dictionary } from '@/i18n/dictionaries'
import { DOCK_CHANNELS, DOCK_PALETTE } from './mobile-dock.content'
import { useMobileDock } from './mobile-dock.logic'

/**
 * Always-available floating contact dock (sticky button + chat widget). Lets a
 * visitor reach WhatsApp from any scroll position; every channel click is
 * tracked as a conversion.
 */
export function MobileDock({ content }: { content: Dictionary['mobileDock'] }) {
  const { open, toggle } = useMobileDock()
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open &&
        DOCK_CHANNELS.map((channel) => (
          <a
            key={channel.key}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(channel.event)}
            className={cn(
              'flex animate-fade-in items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white shadow-lg',
              DOCK_PALETTE[channel.key]
            )}
          >
            {content[channel.key]}
          </a>
        ))}
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={content.label}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-surface text-2xl text-white shadow-xl transition-transform hover:scale-105"
      >
        {open ? '✕' : '💬'}
      </button>
    </div>
  )
}
