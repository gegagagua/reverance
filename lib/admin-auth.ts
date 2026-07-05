import 'server-only'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, ADMIN_TOKEN } from './admin-session'

// Hardcoded single admin (override via env in deployment if desired).
const USER = process.env.ADMIN_USER ?? 'admin'
const PASS = process.env.ADMIN_PASS ?? 'Otium199@'

/** Constant-time-ish credential check against the hardcoded admin. */
export function checkCredentials(username: string, password: string): boolean {
  return username === USER && password === PASS
}

/** True when the current request carries a valid admin session cookie. */
export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies()
  return store.get(ADMIN_COOKIE)?.value === ADMIN_TOKEN
}

/** Starts an admin session (httpOnly cookie, 12h). */
export async function signIn(): Promise<void> {
  const store = await cookies()
  store.set(ADMIN_COOKIE, ADMIN_TOKEN, {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  })
}

/** Ends the admin session. */
export async function signOut(): Promise<void> {
  const store = await cookies()
  store.delete(ADMIN_COOKIE)
}
