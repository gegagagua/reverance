import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

const tones = {
  light: 'border-foreground/10 bg-background',
  muted: 'border-foreground/10 bg-foreground/[0.02]',
  dark: 'border-white/10 bg-white/[0.04] text-white',
} as const

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: keyof typeof tones
}

/** Shared surface primitive — a rounded, bordered card used by feature grids. */
export function Card({ tone = 'light', className, ...props }: CardProps) {
  return <div className={cn('rounded-2xl border p-6', tones[tone], className)} {...props} />
}
