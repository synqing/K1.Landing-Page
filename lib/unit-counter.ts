"use client"
import { useEffect, useState } from 'react'
import { CONFIG } from './site-config'
import { analytics } from './analytics'

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
