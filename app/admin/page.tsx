"use client"
import { useEffect, useMemo, useState } from 'react'

type WaitlistItem = { emailMasked: string; ts: number }

export default function AdminPage() {
  const [authOk, setAuthOk] = useState(false)
  const [count, setCount] = useState(0)
  const [last, setLast] = useState<WaitlistItem[]>([])
  const [units, setUnits] = useState<{ unitsTotal: number; unitsSold: number; lastUpdated?: string } | null>(null)
  const [soldInput, setSoldInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  useEffect(() => {
    const keyParam = new URLSearchParams(window.location.search).get('key')
    const required = process.env.NEXT_PUBLIC_ADMIN_KEY
    if (!required) {
      // No key required — allow in dev by default
      setAuthOk(true)
      return
    }
    setAuthOk(keyParam === required)
  }, [])

  async function load() {
    try {
      const wl = await fetch('/api/waitlist', { cache: 'no-store' }).then((r) => r.json())
      setCount(wl.count ?? 0)
      setLast(wl.last ?? [])
    } catch (error) {
      console.error('[admin] Waitlist load failed:', error)
    }
    try {
      const u = await fetch('/api/units', { cache: 'no-store' }).then((r) => r.json())
      setUnits(u)
    } catch (error) {
      console.error('[admin] Units load failed:', error)
    }
  }

  useEffect(() => {
    if (!authOk) return
    load()
  }, [authOk])

  const lastFormatted = useMemo(() => last.map((e) => ({
    ...e,
    time: new Date(e.ts).toLocaleString(),
  })), [last])

  async function updateUnits(e: React.FormEvent) {
    e.preventDefault()
    if (!soldInput) return
    const sold = Number(soldInput)
    if (!Number.isInteger(sold) || sold < 0) {
      setMsg('Enter a valid non-negative integer for units sold.')
      return
    }
    setBusy(true)
    setMsg(null)
    try {
      const res = await fetch('/api/units', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ unitsSold: sold }),
      })
      if (!res.ok) throw new Error('Update failed')
      const data = await res.json()
      setUnits(data)
      setMsg('Units updated.')
      setSoldInput('')
    } catch (err: any) {
      setMsg(err?.message || 'Update failed')
    } finally {
      setBusy(false)
    }
  }

  if (!authOk) {
    return (
      <main className="container max-w-content mx-auto p-6 py-16">
        <h1 className="text-3xl font-bold mb-2">Admin</h1>
        <p className="text-warn">Unauthorized. Append <code>?key=YOUR_KEY</code> to the URL.</p>
      </main>
    )
  }

  return (
    <main className="container max-w-content mx-auto p-6 py-16">
      <h1 className="text-3xl font-bold mb-4">Admin</h1>

      <section className="glass rounded-2xl p-6 mb-8">
        <h2 className="text-xl font-semibold mb-3">Waitlist</h2>
        <div className="text-sm text-muted mb-3">Total: {count}</div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted">
                <th className="py-1 pr-4">Email</th>
                <th className="py-1">Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {lastFormatted.map((e, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="py-1 pr-4">{e.emailMasked}</td>
                  <td className="py-1">{e.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="glass rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-3">Units</h2>
        <div className="text-sm text-muted mb-3">
          {units ? (
            <>
              <div>Units Total: {units.unitsTotal}</div>
              <div>Units Sold: {units.unitsSold}</div>
              {units.lastUpdated && <div>Last Updated: {new Date(units.lastUpdated).toLocaleString()}</div>}
            </>
          ) : 'Loading…'}
        </div>
        <form onSubmit={updateUnits} className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs text-muted mb-1">Set Units Sold</label>
            <input
              value={soldInput}
              onChange={(e) => setSoldInput(e.target.value)}
              placeholder="e.g. 32"
              className="w-full rounded-md bg-transparent border border-white/20 px-4 py-3 outline-none"
            />
          </div>
          <button disabled={busy} className="button-primary" type="submit">{busy ? 'Updating…' : 'Update'}</button>
        </form>
        {msg && <div className="mt-3 text-sm text-info">{msg}</div>}
      </section>
    </main>
  )
}

