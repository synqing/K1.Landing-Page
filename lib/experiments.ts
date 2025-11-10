"use client"
import { useEffect, useMemo, useState } from 'react'

type VariantKey = 'hero_cta' | 'specs_placement'

/**
 * A client-side hook for running A/B tests or experiments.
 *
 * This hook determines which variant of an experiment a user should see.
 * The selection is prioritized as follows:
 * 1. A URL query string parameter (e.g., `?hero_cta=B`).
 * 2. A value stored in `localStorage` from a previous session.
 * 3. A random assignment for first-time users, which is then persisted.
 *
 * @template T - A string literal type representing the possible variants.
 * @param {VariantKey} key - The unique identifier for the experiment.
 * @param {readonly T[]} variants - An array of possible variant values.
 * @returns {T} The assigned variant for the current user.
 */
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

