import 'server-only'
import { readdir } from 'node:fs/promises'
import { join } from 'node:path'

const ROOT = join(process.cwd(), 'public')
const IMAGES_DIR = join(ROOT, 'theme', 'images')
const EXT = /\.(webp|avif|png|jpe?g|svg|gif)$/i

/**
 * Walks `public/theme/images` and returns every image as a public path
 * (`/theme/images/...`), sorted. Powers the admin's asset picker datalist.
 */
export async function listAssets(dir: string = IMAGES_DIR): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const out: string[] = []
  for (const entry of entries) {
    const full = join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await listAssets(full)))
    else if (EXT.test(entry.name))
      out.push(
        '/' +
          full
            .slice(ROOT.length + 1)
            .split('\\')
            .join('/')
      )
  }
  return out.sort()
}
