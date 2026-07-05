'use client'

import type { ContentOverrides } from '@/lib/content/types'
import { getIn } from './admin.state'
import { useLocale, useView } from './admin.logic'
import { FieldTree } from './field-tree.ui'

/**
 * Editor panel for the active page. Media edits the image set; any other view
 * edits that dictionary section in the currently selected language. The tree
 * structure comes from the initial draft; each leaf reads its live value.
 */
export function AdminSection({ initial }: { initial: ContentOverrides }) {
  const [view] = useView()
  const [locale] = useLocale()

  const isMedia = view === 'media'
  const path = isMedia ? ['images'] : ['text', locale, view]
  const node = getIn(initial, path)

  return (
    <div className="rounded-2xl border border-foreground/10 bg-white p-6">
      <FieldTree node={node} path={path} mode={isMedia ? 'media' : 'text'} />
    </div>
  )
}
