type Json = unknown

const isObject = (v: Json): v is Record<string, Json> =>
  typeof v === 'object' && v !== null && !Array.isArray(v)

/**
 * Deep-merges `override` onto `base`. Plain objects merge key-by-key; arrays and
 * primitives from `override` replace the base wholesale (element-wise array merge
 * is fragile, and the editor always sends complete arrays). Pure — no mutation.
 */
export function deepMerge<T>(base: T, override: unknown): T {
  if (override === undefined) return base
  if (!isObject(base) || !isObject(override)) return override as T

  const out: Record<string, Json> = { ...base }
  for (const key of Object.keys(override)) {
    out[key] = deepMerge((base as Record<string, Json>)[key], override[key])
  }
  return out as T
}
