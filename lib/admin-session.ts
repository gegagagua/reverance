/**
 * Admin session constants. Kept dependency-free (no `server-only`) so the edge
 * `proxy.ts` can import them to gate `/admin` without pulling in Node APIs.
 */
export const ADMIN_COOKIE = 'rev_admin'

/** Opaque session token set on login and checked on every admin request. */
export const ADMIN_TOKEN = 'rev.admin.session.v1.6f3a9c2e8d1b47'

export const LOGIN_PATH = '/admin-login'
export const ADMIN_PATH = '/admin'
