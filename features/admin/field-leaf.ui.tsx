'use client'

import { Input, Textarea } from '@/components/ui'
import { useField } from './admin.logic'
import { humanize } from './admin.content'

/** A single editable text leaf — textarea for long copy, input for short values. */
export function FieldLeaf({ path, label }: { path: string[]; label: string }) {
  const [value, setValue] = useField(path)
  const id = path.join('.')
  const multiline = value.length > 64 || value.includes('\n')

  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
        {humanize(label)}
      </span>
      {multiline ? (
        <Textarea id={id} rows={3} value={value} onChange={(e) => setValue(e.target.value)} />
      ) : (
        <Input id={id} value={value} onChange={(e) => setValue(e.target.value)} />
      )}
    </label>
  )
}
