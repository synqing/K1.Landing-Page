"use client"
import { CONFIG } from '@/lib/site-config'
import { useUnitCounter } from '@/lib/unit-counter'
import { useExperiment } from '@/lib/experiments'
import { analytics } from '@/lib/analytics'

export default function PricingScarcity() {
  const { remaining } = useUnitCounter()
  const ctaVariant = useExperiment('hero_cta', ['reserve', 'secure', 'split'])

  const split = CONFIG.splitEnabled
  const splitNow = Math.ceil(CONFIG.price/2)
  const splitLater = CONFIG.price - splitNow

  const cta = ctaVariant === 'split' && split
    ? `Reserve ($${splitNow} now + $${splitLater} at ship)`
    : `Reserve — $${CONFIG.price}`

  return (
    <section id="pricing" className="container max-w-content mx-auto p-6 py-16">
      <div className="glass rounded-2xl p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-3xl font-bold mb-1">Founder&apos;s Edition</h3>
            <p className="text-muted">Ships {CONFIG.shipDate}. Numbered units. Lifetime firmware updates.</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${CONFIG.price}</div>
            {split && (
              <div className="text-sm text-muted">or ${splitNow} now + ${splitLater} later</div>
            )}
          </div>
        </div>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            className="button-primary"
            href="/checkout"
            onClick={() => analytics.track('cta_click', { loc: 'pricing', variant: ctaVariant })}
          >
            {cta}
          </a>
          <div className="inline-flex items-center rounded-md px-3 py-2 text-warn border border-white/20 glass-inset">
            {remaining} of {CONFIG.unitsTotal} remaining
          </div>
        </div>
      </div>
    </section>
  )
}
