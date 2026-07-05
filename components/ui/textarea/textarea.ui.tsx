import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

/** Presentational multiline input. Stays server-compatible; consumers wire value/onChange. */
export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        'w-full rounded-2xl border border-foreground/15 bg-transparent px-4 py-3 text-sm',
        'placeholder:text-foreground/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/30',
        className
      )}
      {...props}
    />
  )
}
