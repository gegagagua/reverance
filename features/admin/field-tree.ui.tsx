import { FieldLeaf } from './field-leaf.ui'
import { ImageField } from './image-field.ui'
import { humanize } from './admin.content'
import { isPinnedImage } from '@/lib/content/pinned'

interface Props {
  node: unknown
  path: string[]
  mode: 'text' | 'media'
}

/** Key/value pairs of a container, with array indices as string keys. */
function entries(node: unknown): [string, unknown][] {
  if (Array.isArray(node)) return node.map((v, i) => [String(i), v])
  if (node && typeof node === 'object') return Object.entries(node as Record<string, unknown>)
  return []
}

/**
 * Renders a content subtree generically: string values become editable leaves,
 * nested objects/arrays become labeled groups. Holds no store state itself —
 * each leaf subscribes to its own field, so a keystroke re-renders only that input.
 */
export function FieldTree({ node, path, mode }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {entries(node).map(([key, child]) => {
        const childPath = [...path, key]
        if (typeof child === 'string') {
          return mode === 'media' ? (
            // childPath is ['images', ...rest]; pin keys are dot-paths under SiteImages.
            <ImageField
              key={key}
              path={childPath}
              label={key}
              pinned={isPinnedImage(childPath.slice(1).join('.'))}
            />
          ) : (
            <FieldLeaf key={key} path={childPath} label={key} />
          )
        }
        return (
          <fieldset key={key} className="flex flex-col gap-4 rounded-xl border border-foreground/10 p-4">
            <legend className="px-1 text-sm font-semibold text-foreground/70">{humanize(key)}</legend>
            <FieldTree node={child} path={childPath} mode={mode} />
          </fieldset>
        )
      })}
    </div>
  )
}
