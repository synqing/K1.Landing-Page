"use client"

type EventProps = Record<string, unknown>

const ENDPOINT = process.env.NEXT_PUBLIC_ANALYTICS_URL

/**
 * Sends an analytics event.
 *
 * This function tracks a given event with associated properties. It persists
 * the event to `localStorage` as a breadcrumb, sends it to a remote analytics
 * endpoint if configured, and logs it to the console in development.
 *
 * @param {string} event - The name of the event to track.
 * @param {EventProps} props - An object of key-value pairs that provide context for the event.
 */
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
    // Keep last 100 events (not 4000 chars which corrupts JSON)
    const trimmed = arr.slice(-100)
    localStorage.setItem(key, JSON.stringify(trimmed))
  } catch (error) {
    console.error('[analytics] localStorage failed:', error)
  }

  // Optional: fire-and-forget to external analytics if configured
  try {
    if (ENDPOINT && typeof navigator !== 'undefined' && 'sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' })
      navigator.sendBeacon(ENDPOINT, blob)
    }
  } catch (error) {
    console.error('[analytics] sendBeacon failed:', error)
  }

  // Always echo to console in dev for visibility
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.debug('[analytics]', event, props)
  }
}

/**
 * Analytics tracking object.
 * Provides a method to track application events.
 */
export const analytics = {
  /**
   * Tracks an event with the given properties.
   * @param {string} event - The name of the event to track.
   * @param {EventProps} props - An object of key-value pairs that provide context for the event.
   */
  track: send,
}

