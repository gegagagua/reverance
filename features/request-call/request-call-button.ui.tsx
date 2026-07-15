'use client'

import { Button, type ButtonProps } from '@/components/ui'
import { useOpenRequestCall } from './request-call.logic'
import type { RequestCallContext } from './request-call.state'

/**
 * Shared CTA leaf: every "Request a Call" button opens the modal (same as the
 * header) instead of scrolling to `#contact`. Callers keep passing variant,
 * size, and an optional `onClick` for tracking. Pass `leadContext` to attribute
 * the opened lead to a specific apartment type + CTA source (item #4).
 */
export function RequestCallButton({
  onClick,
  leadContext,
  ...props
}: ButtonProps & { leadContext?: RequestCallContext }) {
  const openRequestCall = useOpenRequestCall()
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e)
        openRequestCall(leadContext)
      }}
    />
  )
}
