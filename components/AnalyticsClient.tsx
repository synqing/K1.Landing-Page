"use client"
import { useEffect } from 'react'
import { analytics } from '@/lib/analytics'
import { useExperiment } from '@/lib/experiments'

export default function AnalyticsClient() {
  const heroCta = useExperiment('hero_cta', ['reserve', 'secure', 'split'])
  const specs = useExperiment('specs_placement', ['overlay', 'card'])

  useEffect(() => {
    analytics.track('page_view', { heroCta, specs })

    const thresholds = [25, 50, 75, 100]
    const seen = new Set<number>()
    const onScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const pct = docHeight > 0 ? Math.min(100, Math.round((scrollTop / docHeight) * 100)) : 0
      for (const t of thresholds) {
        if (pct >= t && !seen.has(t)) {
          seen.add(t)
          analytics.track('scroll_depth', { percent: t })
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [heroCta, specs])

  return null
}

