import { cn, type ClassValue } from './cn'

type VariantMap = Record<string, Record<string, string>>

type VariantSelection<M extends VariantMap> = {
  [K in keyof M]?: keyof M[K]
}

type VariantArgs<M extends VariantMap> = VariantSelection<M> & {
  className?: ClassValue
}

/**
 * Hand-rolled, type-safe variant resolver (a lean stand-in for `cva`).
 * Maps each selected variant key to a Tailwind-only class string. Keeping
 * the class maps here is what lets a primitive's `.ui.tsx` stay presentational.
 */
export function variants<M extends VariantMap>(
  base: string,
  map: M,
  defaults: { [K in keyof M]: keyof M[K] }
) {
  return (args: VariantArgs<M> = {}): string => {
    const picked = Object.entries(map).map(([key, group]) => {
      const value = (args[key as keyof M] ?? defaults[key as keyof M]) as string
      return group[value]
    })
    return cn(base, ...picked, args.className)
  }
}
