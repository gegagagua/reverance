import type { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Theme section rhythm: 100px vertical padding. */
export function Section({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return <section className={cn('w-full py-16 sm:py-[100px]', className)} {...props} />
}
