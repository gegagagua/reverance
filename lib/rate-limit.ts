import 'server-only'
import mysql from 'mysql2/promise'

const env = process.env

const config: mysql.PoolOptions = {
  host: env.DB_HOST ?? '127.0.0.1',
  port: Number(env.DB_PORT ?? 3306),
  user: env.DB_USER ?? 'root',
  password: env.DB_PASSWORD ?? '',
  database: env.DB_NAME ?? 'reverance',
  connectionLimit: 5,
  waitForConnections: true,
}

const g = globalThis as typeof globalThis & {
  __revRatePool?: mysql.Pool
  __revRateSchema?: Promise<void>
  __revRateMem?: Map<string, number>
}

const pool = (): mysql.Pool => (g.__revRatePool ??= mysql.createPool(config))

// In-memory fallback keyed by IP → unix-epoch seconds when the block expires.
// Used when MySQL is unreachable so throttling still works locally without XAMPP.
const mem = (): Map<string, number> => (g.__revRateMem ??= new Map())

const nowSec = (): number => Math.floor(Date.now() / 1000)

const ready = (): Promise<void> =>
  (g.__revRateSchema ??= pool()
    .query(
      `CREATE TABLE IF NOT EXISTS submit_rate_limit (
        ip VARCHAR(64) NOT NULL PRIMARY KEY,
        blocked_until DATETIME NOT NULL,
        INDEX idx_blocked_until (blocked_until)
      )`
    )
    .then(() => undefined)
    .catch((err) => {
      // Drop the cached promise so a later request retries once the DB is back.
      g.__revRateSchema = undefined
      throw err
    }))

/** 24 hours in seconds — the block window after a successful lead submission. */
export const BLOCK_WINDOW_SECONDS = 60 * 60 * 24

/** Reads a client IP from proxy headers. Returns null when nothing usable. */
export function getClientIp(headers: Headers): string | null {
  const fwd = headers.get('x-forwarded-for')
  if (fwd) {
    const first = fwd.split(',')[0]?.trim()
    if (first) return first
  }
  return headers.get('x-real-ip')?.trim() || null
}

function remainingFromMem(ip: string): number {
  const until = mem().get(ip)
  if (!until) return 0
  const left = until - nowSec()
  if (left <= 0) {
    mem().delete(ip)
    return 0
  }
  return left
}

/** Returns remaining block seconds for the IP (0 when not blocked). */
export async function remainingBlockSeconds(ip: string): Promise<number> {
  try {
    await ready()
    const [rows] = await pool().query<mysql.RowDataPacket[]>(
      'SELECT UNIX_TIMESTAMP(blocked_until) - UNIX_TIMESTAMP(NOW()) AS remaining FROM submit_rate_limit WHERE ip = ?',
      [ip]
    )
    const remaining = Number(rows[0]?.remaining ?? 0)
    return remaining > 0 ? remaining : 0
  } catch (err) {
    console.warn('[rate-limit] db read failed, using memory:', (err as Error).message)
    return remainingFromMem(ip)
  }
}

/** Records a submission from this IP, extending the block window from now. */
export async function recordSubmission(ip: string): Promise<void> {
  // Always update memory so the fallback stays consistent with DB writes.
  mem().set(ip, nowSec() + BLOCK_WINDOW_SECONDS)
  try {
    await ready()
    await pool().query(
      `INSERT INTO submit_rate_limit (ip, blocked_until)
       VALUES (?, DATE_ADD(NOW(), INTERVAL ? SECOND))
       ON DUPLICATE KEY UPDATE blocked_until = VALUES(blocked_until)`,
      [ip, BLOCK_WINDOW_SECONDS]
    )
  } catch (err) {
    console.warn('[rate-limit] db write failed, memory only:', (err as Error).message)
  }
}
