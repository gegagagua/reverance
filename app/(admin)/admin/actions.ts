'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { isAuthenticated, signOut } from '@/lib/admin-auth'
import { saveOverrides } from '@/lib/content/read'
import { saveUpload } from '@/lib/content/upload'
import type { ContentOverrides } from '@/lib/content/types'

/** Persists the edited content, then revalidates every public page so edits go live. */
export async function saveContentAction(overrides: ContentOverrides): Promise<{ ok: boolean }> {
  if (!(await isAuthenticated())) throw new Error('Unauthorized')
  await saveOverrides(overrides)
  revalidatePath('/', 'layout')
  return { ok: true }
}

/** Receives an uploaded image, stores it under /public, returns its public path. */
export async function uploadImageAction(formData: FormData): Promise<{ path: string }> {
  if (!(await isAuthenticated())) throw new Error('Unauthorized')
  const file = formData.get('file')
  if (!(file instanceof File)) throw new Error('No file provided')
  return saveUpload(file)
}

/** Ends the session and returns to the login screen. */
export async function logoutAction(): Promise<void> {
  await signOut()
  redirect('/admin-login')
}
