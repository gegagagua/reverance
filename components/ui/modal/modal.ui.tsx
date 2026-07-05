'use client'

import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useModalControls } from './modal.logic'

export interface ModalProps {
  open: boolean
  onClose: () => void
  label?: string
  className?: string
  children: ReactNode
}

/** Centered dialog over a dimmed overlay. Esc / backdrop / close-button dismiss.
 * Renders nothing when closed. Content is caller-owned. */
export function Modal({ open, onClose, label, className, children }: ModalProps) {
  useModalControls({ open, onClose })
  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex animate-fade-in items-center justify-center bg-black/60 p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          'relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-background p-8 shadow-2xl sm:p-10',
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
