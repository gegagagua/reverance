'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useModalControls } from './modal.logic'

export interface ModalProps {
  open: boolean
  onClose: () => void
  label?: string
  /** `md` (default) is the compact centered card; `full` fills ~90% of the
   * viewport for media-heavy content like the live-camera wall. */
  size?: 'md' | 'full'
  className?: string
  children: ReactNode
}

const panelBySize = {
  md: 'max-h-[90vh] w-full max-w-lg p-8 sm:p-10',
  full: 'h-[95vh] w-[95vw] max-w-[95vw] p-3 sm:h-[90vh] sm:p-6',
}

/** Centered dialog over a dimmed overlay. Esc / backdrop / close-button dismiss.
 * Renders nothing when closed. Content is caller-owned. */
export function Modal({ open, onClose, label, size = 'md', className, children }: ModalProps) {
  useModalControls({ open, onClose })
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-black/60 p-2 sm:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative overflow-y-auto rounded-2xl bg-background shadow-2xl',
          panelBySize[size],
          className
        )}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-xl text-foreground/50 transition-colors hover:bg-foreground/5 hover:text-foreground"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  )
}
