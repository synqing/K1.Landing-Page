"use client"
import { useEffect, useState } from 'react'
import { CONFIG } from './site-config'
import { analytics } from './analytics'

export function useUnitCounter() {
  const [remaining, setRemaining] = useState(CONFIG.unitsTotal - CONFIG.unitsSold)

  useEffect(() => {
    let aborted = false
    async function load() {
      try {
        // Prefer API (enables dynamic updates in server mode); fallback to static JSON
        let res = await fetch('/api/units', { cache: 'no-store' })
        if (!res.ok) {
          res = await fetch('/data/units.json', { cache: 'no-store' })
        }
        if (!res.ok) throw new Error('fetch failed')
        const data = await res.json()
        if (!aborted && typeof data.unitsTotal === 'number' && typeof data.unitsSold === 'number') {
          setRemaining(data.unitsTotal - data.unitsSold)
        }
      } catch {
        // fallback to env config
        setRemaining(CONFIG.unitsTotal - CONFIG.unitsSold)
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
