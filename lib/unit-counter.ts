"use client"
import { useEffect, useState } from 'react'
import { CONFIG } from './site-config'
import { analytics } from './analytics'

/**
 * A React hook that provides the number of remaining units.
 *
 * This hook is responsible for fetching the latest count of total and sold units
 * to calculate the number of units still available. It follows a layered approach:
 * 1. Initializes with compile-time values from `CONFIG`.
 * 2. Fetches the latest data from the `/api/units` endpoint.
 * 3. Falls back to a static `/data/units.json` file if the API fails.
 * 4. Uses the initial `CONFIG` values if both fetch attempts fail.
 *
 * It polls for new data every 60 seconds to keep the count fresh. It also
 * sends an analytics event whenever the `remaining` count changes.
 *
 * @returns {{ remaining: number }} An object containing the number of units remaining.
 */
export function useUnitCounter() {
  const [remaining, setRemaining] = useState(CONFIG.unitsTotal - CONFIG.unitsSold)

  useEffect(() => {
    let aborted = false
    async function load() {
      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 5000)

      try {
        // Prefer API (enables dynamic updates in server mode); fallback to static JSON
        let res = await fetch('/api/units', {
          cache: 'no-store',
          signal: controller.signal
        })
        if (!res.ok) {
          res = await fetch('/data/units.json', {
            cache: 'no-store',
            signal: controller.signal
          })
        }
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        if (!aborted && typeof data.unitsTotal === 'number' && typeof data.unitsSold === 'number') {
          setRemaining(data.unitsTotal - data.unitsSold)
        }
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
          console.warn('[unit-counter] Request timeout after 5s')
        } else {
          console.error('[unit-counter] Fetch failed:', error)
        }
        // fallback to env config
        setRemaining(CONFIG.unitsTotal - CONFIG.unitsSold)
      } finally {
        clearTimeout(timeout)
      }
    }
    load()
    const id = window.setInterval(load, 60_000)
    return () => {
      aborted = true
      window.clearInterval(id)
    }
  }, [])

  useEffect(() => {
    analytics.track('units_remaining', { remaining })
  }, [remaining])

  return { remaining }
}
