"use client"
import { useExperiment } from '@/lib/experiments'
import { analytics } from '@/lib/analytics'
import { CONFIG } from '@/lib/site-config'
import { useUnitCounter } from '@/lib/unit-counter'

export default function Hero() {
  const ctaVariant = useExperiment('hero_cta', ['reserve', 'secure', 'split'])
  const { remaining } = useUnitCounter()

  const ctaLabel = ctaVariant === 'reserve'
    ? `Reserve Yours — $${CONFIG.price}`
    : ctaVariant === 'secure'
      ? `Secure Your Unit — $${CONFIG.price}`
      : CONFIG.splitEnabled
        ? `Reserve ($${Math.ceil(CONFIG.price/2)} now)`
        : `Reserve — $${CONFIG.price}`

  const specsPlacement = useExperiment('specs_placement', ['overlay', 'card'])

  return (
    <section className="relative min-h-[100svh] flex items-center">
      {/* Background video placeholder */}
      <div className="absolute inset-0 -z-10">
        <div className="w-full h-full bg-background" />
      </div>

      <div className="container max-w-content mx-auto p-6 relative">
        {specsPlacement === 'overlay' && (
          <div className="hidden md:block absolute right-6 top-6 glass-inset rounded-xl px-4 py-3 text-sm text-muted">
            <div className="font-semibold text-foreground mb-1">Quick Specs</div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
              <li>320 RGB LEDs</li>
              <li>ESP32‑S3</li>
              <li>Dual edge‑lit LGP</li>
              <li>USB‑C power</li>
            </ul>
          </div>
        )}
        <div className="glass rounded-2xl p-8 md:p-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-md" style={{background: 'linear-gradient(135deg, #FFB84D, #22DD88)'}}></div>
            <span className="text-sm text-muted">K1-Lightwave</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2">
            K1-Lightwave
          </h1>
          <p className="text-gold text-xl md:text-2xl font-semibold">Founder&apos;s Edition</p>
          <p className="text-lg md:text-xl text-muted mt-4 max-w-2xl">
            Dual edge-lit LGP. 320 individually addressable LEDs. ESP32‑S3. Open hardware. V1 ships {CONFIG.shipDate}.
          </p>
          <div className="mt-6 inline-flex items-center rounded-md px-3 py-1 text-warn border border-white/20 glass-inset">
            ⚠️ {remaining} of {CONFIG.unitsTotal} units remaining
          </div>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <a
              href="/checkout"
              className="button-primary"
              onClick={() => analytics.track('cta_click', { loc: 'hero', variant: ctaVariant })}
            >
              {ctaLabel}
            </a>
            <a
              href="#learn"
              className="button-secondary"
              onClick={() => analytics.track('learn_more_click', { loc: 'hero' })}
            >
              Learn More ↓
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
