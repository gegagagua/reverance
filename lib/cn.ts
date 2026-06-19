export type ClassValue = string | false | null | undefined

/**
 * Joins Tailwind utility strings, dropping falsy values.
 * Intentionally tiny: no `tailwind-merge`/`clsx` so nothing ships to the
 * client beyond a single `Array.filter`. Order of args wins on conflicts.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ')
}
