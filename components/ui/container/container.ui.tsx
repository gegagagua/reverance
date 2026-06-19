import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Centers content at the theme's 1140px container width. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('mx-auto w-full max-w-[1140px] px-4 sm:px-6', className)} {...props} />
}
