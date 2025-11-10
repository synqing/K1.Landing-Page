"use client"
import { useState } from 'react'
import { analytics } from '@/lib/analytics'

export default function EmailCapture() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return
    // Try API first; fallback to local storage
    let ok = false
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      ok = res.ok
    } catch {}
    if (!ok) {
      try {
        const key = 'k1lp:waitlist'
        const arr = JSON.parse(localStorage.getItem(key) || '[]')
        arr.push({ email, ts: Date.now() })
        localStorage.setItem(key, JSON.stringify(arr).slice(-4000))
      } catch {}
    }
    analytics.track('waitlist_submit', { emailMasked: email.replace(/(^.).*(@.*$)/, '$1***$2') })
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
