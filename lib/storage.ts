import { mkdir, readFile, writeFile, rename } from 'fs/promises'
import { join } from 'path'

const DATA_DIR = join(process.cwd(), '.data')
const WAITLIST_PATH = join(DATA_DIR, 'waitlist.json')

/**
 * @typedef {object} WaitlistEntry
 * @property {string} email - The email address of the user who joined the waitlist.
 * @property {number} ts - The timestamp (in milliseconds) when the user joined.
 */
export type WaitlistEntry = { email: string; ts: number }

/**
 * Ensures that the data directory exists.
 *
 * This function creates the directory specified by `DATA_DIR` if it does not
 * already exist. It is used internally to prepare for file write operations.
 * @private
 */
async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true })
}

/**
 * Reads the waitlist from the filesystem.
 *
 * This function retrieves the list of waitlist entries from `waitlist.json`.
 * If the file does not exist or contains invalid data, it logs an error and
 * returns an empty array.
 *
 * @returns {Promise<WaitlistEntry[]>} A promise that resolves to an array of waitlist entries.
 */
export async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(WAITLIST_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as WaitlistEntry[]
    return []
  } catch (error) {
    console.error('[storage] readWaitlist failed:', error)
    return []
  }
}

/**
 * Appends a new entry to the waitlist file.
 *
 * This function adds a new entry to `waitlist.json`. It performs an atomic
 * write by first writing to a temporary file and then renaming it, which
 * helps prevent data corruption from concurrent writes.
 *
 * @param {WaitlistEntry} entry - The waitlist entry to add.
 */
export async function appendWaitlist(entry: WaitlistEntry) {
  await ensureDir()
  const list = await readWaitlist()
  list.push(entry)
  // Use atomic rename to prevent corruption from concurrent writes
  const tmp = WAITLIST_PATH + '.tmp'
  await writeFile(tmp, JSON.stringify(list, null, 2), 'utf-8')
  await rename(tmp, WAITLIST_PATH) // Atomic on POSIX systems
}

