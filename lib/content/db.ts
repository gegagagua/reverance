import 'server-only'
import mysql from 'mysql2/promise'

const env = process.env

/** Connection config. Defaults match the local XAMPP/MariaDB instance; override via env. */
const config: mysql.PoolOptions = {
  host: env.DB_HOST ?? '127.0.0.1',
  port: Number(env.DB_PORT ?? 3306),
  user: env.DB_USER ?? 'root',
  password: env.DB_PASSWORD ?? '',
  database: env.DB_NAME ?? 'reverance',
  connectionLimit: 5,
  waitForConnections: true,
}

// Cache the pool + schema promise on globalThis so HMR / multiple imports reuse one pool.
const g = globalThis as typeof globalThis & {
  __revPool?: mysql.Pool
  __revSchema?: Promise<void>
}

const pool = (): mysql.Pool => (g.__revPool ??= mysql.createPool(config))

/** Creates the single-row content table on first use (idempotent). */
const ready = (): Promise<void> =>
  (g.__revSchema ??= pool()
    .query(
      `CREATE TABLE IF NOT EXISTS site_content (
        id TINYINT UNSIGNED NOT NULL PRIMARY KEY,
        payload LONGTEXT NOT NULL,
        updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`
    )
    .then(() => undefined))

/** Reads the stored overrides JSON string, or null when nothing has been saved. */
export async function readPayload(): Promise<string | null> {
  await ready()
  const [rows] = await pool().query<mysql.RowDataPacket[]>('SELECT payload FROM site_content WHERE id = 1')
  return rows[0]?.payload ?? null
}

/** Upserts the overrides JSON string into the single content row. */
export async function writePayload(payload: string): Promise<void> {
  await ready()
  await pool().query(
    'INSERT INTO site_content (id, payload) VALUES (1, ?) ON DUPLICATE KEY UPDATE payload = VALUES(payload)',
    [payload]
  )
}
