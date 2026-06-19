import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

// Theme body text: 60% black, 1.8 line-height.
const tones = {
  default: 'text-foreground/60',
  muted: 'text-foreground/50',
} as const

export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  tone?: keyof typeof tones
}

export function Text({ tone = 'default', className, ...props }: TextProps) {
  return <p className={cn('text-base leading-[1.8]', tones[tone], className)} {...props} />
}
