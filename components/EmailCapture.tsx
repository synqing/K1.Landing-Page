"use client"
import { useState } from 'react'
import { analytics } from '@/lib/analytics'

/**
 * A component that renders an email capture form.
 *
 * This component provides a form for users to join a waitlist. It handles
 * form submission, validates the email address, and communicates with the
 * `/api/waitlist` endpoint. If the API fails, it falls back to storing the
 * email in `localStorage`.
 *
 * It tracks submission events with analytics and displays a success message
 * upon completion.
 *
 * @returns {JSX.Element} The rendered email capture form or a success message.
 */
export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 5000)

    let ok = false
    let alreadySubscribed = false

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
        signal: controller.signal,
      })

      if (res.status === 409) {
        alreadySubscribed = true
        ok = true // Still consider it success
      } else {
        ok = res.ok
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.warn('[email-capture] Request timeout after 5s')
      } else {
        console.error('[email-capture] API failed:', error)
      }
    } finally {
      clearTimeout(timeout)
    }

    if (!ok && !alreadySubscribed) {
      try {
        const key = 'k1lp:waitlist'
        const arr = JSON.parse(localStorage.getItem(key) || '[]')
        arr.push({ email, ts: Date.now() })
        // Keep last 100 entries, not 4000 chars
        const trimmed = arr.slice(-100)
        localStorage.setItem(key, JSON.stringify(trimmed))
      } catch (error) {
        console.error('[email-capture] localStorage fallback failed:', error)
      }
    }

    analytics.track('waitlist_submit', {
      emailMasked: email.replace(/(^.).*(@.*$)/, '$1***$2'),
      duplicate: alreadySubscribed
    })
    setDone(true)
  }

  if (done) {
    return <div className="text-ok text-sm">Thanks — you\'re on the list. We\'ll email when reservations open.</div>
  }

  return (
    <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="min-w-0 flex-1 rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none"
        aria-label="Email address"
      />
      <button type="submit" className="button-primary">Join Waitlist</button>
    </form>
  )
}
