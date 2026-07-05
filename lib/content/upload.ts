import 'server-only'
import { mkdir, writeFile } from 'node:fs/promises'
import { join } from 'node:path'

const UPLOAD_DIR = join(process.cwd(), 'public', 'theme', 'images', 'uploads')
const PUBLIC_BASE = '/theme/images/uploads'

// next/image can't optimize SVG without extra config, so accept raster formats only.
const ALLOWED = /\.(webp|avif|png|jpe?g|gif)$/i
const MAX_BYTES = 8 * 1024 * 1024

/**
 * Writes an uploaded image into `public/theme/images/uploads` and returns its
 * public path. Name is sanitized and timestamp-prefixed to avoid collisions.
 */
export async function saveUpload(file: File): Promise<{ path: string }> {
  const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
  if (!ALLOWED.test(safe)) throw new Error('Unsupported file type')
  if (file.size === 0 || file.size > MAX_BYTES) throw new Error('File must be 1 byte–8 MB')

  await mkdir(UPLOAD_DIR, { recursive: true })
  const name = `${Date.now()}-${safe}`
  await writeFile(join(UPLOAD_DIR, name), Buffer.from(await file.arrayBuffer()))
  return { path: `${PUBLIC_BASE}/${name}` }
}
