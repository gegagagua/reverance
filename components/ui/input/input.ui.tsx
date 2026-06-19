import type { InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Presentational input. Stays server-compatible; consumers wire value/onChange. */
export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'h-11 w-full rounded-full border border-foreground/15 bg-transparent px-5 text-sm',
        'placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30',
        className
      )}
      {...props}
    />
  )
}
