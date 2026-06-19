import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

// Sizes match the theme: h1 60px, h2 48px, h3 26px (Jost, weight 400).
const sizes = {
  xl: 'text-[40px] leading-[1.15] tracking-[-0.02em] sm:text-[60px]',
  lg: 'text-[32px] leading-[1.2] tracking-[-0.015em] sm:text-[48px]',
  md: 'text-[22px] leading-[1.5] sm:text-[26px]',
} as const

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3'
  size?: keyof typeof sizes
}

export function Heading({ as: Tag = 'h2', size = 'lg', className, ...props }: HeadingProps) {
  return <Tag className={cn(sizes[size], 'font-heading font-normal text-foreground', className)} {...props} />
}
