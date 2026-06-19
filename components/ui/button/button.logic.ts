import { variants } from '@/lib/variants'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'accent' | 'light'
export type ButtonSize = 'sm' | 'md' | 'lg'

/**
 * The single source of truth for button styling. Exported on its own so a
 * `next/link` can render as a button without duplicating any class strings.
 */
export const buttonClass = variants(
  'inline-flex items-center justify-center rounded-full font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variant: {
      primary: 'bg-foreground text-background hover:opacity-90',
      secondary: 'border border-foreground/15 hover:bg-foreground/5',
      ghost: 'hover:bg-foreground/5',
      accent: 'bg-accent text-white hover:opacity-90',
      light: 'border border-white/25 text-white hover:bg-white/10',
    },
    size: {
      sm: 'h-9 px-4 text-sm',
      md: 'h-11 px-5 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  { variant: 'primary', size: 'md' }
)
