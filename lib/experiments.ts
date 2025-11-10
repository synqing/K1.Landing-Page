"use client"
import { useEffect, useMemo, useState } from 'react'

type VariantKey = 'hero_cta' | 'specs_placement'

export function useExperiment<T extends string>(key: VariantKey, variants: readonly T[]): T {
  const [value, setValue] = useState<T>(variants[0])

  useEffect(() => {
    const qs = new URLSearchParams(window.location.search)
    const override = qs.get(key)
    if (override && variants.includes(override as T)) {
      setValue(override as T)
      window.localStorage.setItem(`exp:${key}`, override)
      return
    }

    const stored = window.localStorage.getItem(`exp:${key}`)
    if (stored && variants.includes(stored as T)) {
      setValue(stored as T)
      return
    }

    // Random assignment
    const idx = Math.floor(Math.random() * variants.length)
    const chosen = variants[idx]
    setValue(chosen)
    window.localStorage.setItem(`exp:${key}`, chosen)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return value
}

