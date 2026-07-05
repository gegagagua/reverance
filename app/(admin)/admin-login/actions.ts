'use server'

import { redirect } from 'next/navigation'
import { checkCredentials, signIn } from '@/lib/admin-auth'

export interface LoginState {
  error?: string
}

/** Server Action backing the login form. On success, sets the session and redirects. */
export async function loginAction(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const username = String(formData.get('username') ?? '')
  const password = String(formData.get('password') ?? '')

  if (!checkCredentials(username, password)) {
    return { error: 'Invalid username or password.' }
  }

  await signIn()
  redirect('/admin')
}
