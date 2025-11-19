"use client"
import { useExperiment } from '@/lib/experiments'
import { analytics } from '@/lib/analytics'
import { CONFIG } from '@/lib/site-config'
import { useUnitCounter } from '@/lib/unit-counter'

/**
 * Enhanced Hero component with video integration support.
 *
 * Displays the hero section with:
 * - Left: Product copy, CTA, scarcity counter
 * - Right: Background video (Category 4 light show or fallback)
 *
 * Video automatically plays, loops, and is muted for autoplay compliance.
 * Includes fallback poster image if video fails to load.
 *
 * @returns {JSX.Element} The rendered hero section with video.
 */
export default function HeroWithVideo() {
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
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background video - Hero light show */}
      <div className="absolute inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
          poster="/assets/videos/hero-lightshow-poster.jpg"
        >
          <source src="/assets/videos/hero-lightshow.mp4" type="video/mp4" />
          {/* Fallback to static background if video fails */}
          <div className="w-full h-full bg-background" />
        </video>
        {/* Gradient overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
      </div>

      <div className="container max-w-content mx-auto p-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left column: Copy and CTA */}
          <div className="glass rounded-2xl p-8 md:p-10 backdrop-blur-xl">
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

            {specsPlacement === 'card' && (
              <div className="mt-8 glass-inset rounded-xl p-4 text-sm text-muted">
                <div className="font-semibold text-foreground mb-2">Quick Specs</div>
                <ul className="grid grid-cols-2 gap-x-6 gap-y-2">
                  <li className="flex items-center gap-2">
                    <span className="text-gold">●</span> 320 RGB LEDs
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold">●</span> ESP32‑S3
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold">●</span> Dual edge‑lit LGP
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-gold">●</span> USB‑C power
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Right column: Featured video showcase (optional - shows on larger screens) */}
          {specsPlacement === 'overlay' && (
            <div className="hidden lg:block">
              <div className="relative rounded-2xl overflow-hidden glass border border-white/10">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full aspect-video object-cover"
                  poster="/assets/videos/hero-lightshow-poster.jpg"
                >
                  <source src="/assets/videos/hero-lightshow.mp4" type="video/mp4" />
                </video>
                <div className="absolute top-4 right-4 glass-inset rounded-xl px-4 py-3 text-sm text-muted backdrop-blur-xl">
                  <div className="font-semibold text-foreground mb-1">Quick Specs</div>
                  <ul className="grid grid-cols-2 gap-x-6 gap-y-1">
                    <li>320 RGB LEDs</li>
                    <li>ESP32‑S3</li>
                    <li>Dual edge‑lit LGP</li>
                    <li>USB‑C power</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
