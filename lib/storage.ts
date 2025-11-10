import { mkdir, readFile, writeFile } from 'fs/promises'
import { dirname, join } from 'path'

const DATA_DIR = join(process.cwd(), '.data')
const WAITLIST_PATH = join(DATA_DIR, 'waitlist.json')

export type WaitlistEntry = { email: string; ts: number }

async function ensureDir() {
  await mkdir(DATA_DIR, { recursive: true })
}

export async function readWaitlist(): Promise<WaitlistEntry[]> {
  try {
    const raw = await readFile(WAITLIST_PATH, 'utf-8')
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as WaitlistEntry[]
    return []
  } catch {
    return []
  }
}

export async function appendWaitlist(entry: WaitlistEntry) {
  await ensureDir()
  const list = await readWaitlist()
  list.push(entry)
  const tmp = WAITLIST_PATH + '.tmp'
  await writeFile(tmp, JSON.stringify(list, null, 2), 'utf-8')
  await writeFile(WAITLIST_PATH, JSON.stringify(list, null, 2), 'utf-8')
}

