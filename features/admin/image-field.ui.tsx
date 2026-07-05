'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'
import { Button, Input } from '@/components/ui'
import { uploadImageAction } from '@/app/(admin)/admin/actions'
import { useField } from './admin.logic'
import { ASSET_LIST_ID, humanize, isImagePath } from './admin.content'

/** Image slot: live preview, path field (with asset autocomplete), and file upload. */
export function ImageField({ path, label }: { path: string[]; label: string }) {
  const [value, setValue] = useField(path)
  const fileRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const id = path.join('.')

  const onPick = async (file: File | undefined) => {
    if (!file) return
    setBusy(true)
    try {
      const data = new FormData()
      data.append('file', file)
      const res = await uploadImageAction(data)
      if (res.path) setValue(res.path)
    } finally {
      setBusy(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  return (
    <label htmlFor={id} className="flex flex-col gap-1.5">
      <span className="text-xs font-medium uppercase tracking-wide text-foreground/50">
        {humanize(label)}
      </span>
      <div className="flex items-center gap-3">
        {isImagePath(value) ? (
          <Image
            src={value}
            alt=""
            width={64}
            height={48}
            className="h-12 w-16 shrink-0 rounded-md object-cover"
          />
        ) : (
          <span className="h-12 w-16 shrink-0 rounded-md bg-foreground/10" />
        )}
        <Input id={id} list={ASSET_LIST_ID} value={value} onChange={(e) => setValue(e.target.value)} />
        <input
          ref={fileRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
          aria-label={`Upload ${humanize(label)}`}
          className="hidden"
          onChange={(e) => onPick(e.target.files?.[0])}
        />
        <Button
          type="button"
          variant="secondary"
          size="sm"
          disabled={busy}
          onClick={() => fileRef.current?.click()}
        >
          {busy ? 'Uploading…' : 'Upload'}
        </Button>
      </div>
    </label>
  )
}
