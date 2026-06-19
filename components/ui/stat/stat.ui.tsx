import { cn } from '@/lib/cn'

export interface StatProps {
  value: string
  label: string
  className?: string
}

/** Big "visual number" + caption. Used by the investment statistics block. */
export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="font-heading text-[40px] leading-none tracking-[-0.02em] text-accent sm:text-[56px]">
        {value}
      </span>
      <span className="text-sm text-foreground/60">{label}</span>
    </div>
  )
}
