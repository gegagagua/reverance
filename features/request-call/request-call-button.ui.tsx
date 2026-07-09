'use client'

import { Button, type ButtonProps } from '@/components/ui'
import { useOpenRequestCall } from './request-call.logic'

/**
 * Shared CTA leaf: every "Request a Call" button opens the modal (same as the
 * header) instead of scrolling to `#contact`. Callers keep passing variant,
 * size, and an optional `onClick` for tracking.
 */
export function RequestCallButton({ onClick, ...props }: ButtonProps) {
  const openRequestCall = useOpenRequestCall()
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e)
        openRequestCall()
      }}
    />
  )
}
