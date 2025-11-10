"use client"

type EventProps = Record<string, unknown>

const ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_URL

function send(event: string, props: EventProps) {
  const payload = {
    event,
    props,
    ts: Date.now(),
    path: typeof window !== 'undefined' ? window.location.pathname : ''
  }

  try {
    // Persist locally as a simple breadcrumb
    const key = 'k1lp:events'
    const arr = JSON.parse(localStorage.getItem(key) || '[]')
    arr.push(payload)
    localStorage.setItem(key, JSON.stringify(arr).slice(-4000))
  } catch {}

  // Optional: fire-and-forget to external analytics if configured
  try {
    if (ENDPOINT && typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon(ENDPOINT, blob)
    }
  } catch {}

  // Always echo to console in dev for visibility
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props)
  }
}

export const analytics = {
  track: send,
}

