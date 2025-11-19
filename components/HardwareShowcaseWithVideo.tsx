"use client"
import { useState } from 'react'

/**
 * Enhanced Hardware Showcase component with video integration.
 *
 * Features:
 * - Large rotating product video (Category 1 hero rotation)
 * - Fallback to context desk video (Category 3) if rotation unavailable
 * - Poster images for graceful loading
 * - Bento grid layout with feature cards
 *
 * @returns {JSX.Element} The rendered hardware showcase section.
 */
export default function HardwareShowcaseWithVideo() {
  const [videoError, setVideoError] = useState(false)

  return (
    <section id="learn" className="container max-w-content mx-auto p-6 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">What Makes K1 Different</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Large product video area - Category 1 rotation or Category 3 context */}
        <div className="md:col-span-8 md:row-span-2 glass rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center relative group">
          {!videoError ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              poster="/assets/videos/product-showcase-poster.jpg"
              onError={() => setVideoError(true)}
            >
              {/* Primary: Hero rotation video */}
              <source src="/assets/videos/hero-rotation.mp4" type="video/mp4" />
              {/* Fallback: Context desk video */}
              <source src="/assets/videos/context-desk.mp4" type="video/mp4" />
            </video>
          ) : (
            // Fallback to poster image if video fails to load
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-background to-surface">
              <div className="text-center p-8">
                <div className="text-gold text-6xl mb-4">✨</div>
                <p className="text-muted">
                  Video preview loading...
                  <br />
                  <span className="text-xs">See the full showcase below</span>
                </p>
              </div>
            </div>
          )}
          {/* Video overlay label (appears on hover) */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="glass-inset rounded-lg px-3 py-2 text-xs text-muted backdrop-blur-xl">
              <span className="text-gold">●</span> Live preview
            </div>
          </div>
        </div>

        {/* Feature cards */}
        <div className="md:col-span-4 glass-inset rounded-2xl p-5">
          <h3 className="uppercase tracking-wider text-sm text-muted mb-2">Dual Edge‑Lit LGP</h3>
          <p className="text-sm leading-relaxed">
            First consumer device with dual-edge illumination. Light enters from both sides for even diffusion with zero hotspots.
          </p>
        </div>

        <div className="md:col-span-4 glass-inset rounded-2xl p-5">
          <h3 className="uppercase tracking-wider text-sm text-muted mb-2">320 Addressable LEDs</h3>
          <p className="text-sm leading-relaxed">
            True per‑LED control (RGBIC). 160 LEDs per edge. Powered by ESP32‑S3 dual‑core.
          </p>
        </div>

        {/* Optional: Edge detail video callout */}
        <div className="md:col-span-6 glass rounded-2xl p-6 flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg glass-inset flex items-center justify-center text-2xl">
              📐
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Precision Engineering</h4>
            <p className="text-sm text-muted">
              32cm dual-edge light guide plate with engineered acrylic for perfect light diffusion
            </p>
          </div>
        </div>

        {/* Built for desks card */}
        <div className="md:col-span-6 glass rounded-2xl p-6 flex items-center gap-4">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-lg glass-inset flex items-center justify-center text-2xl">
              💻
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-1">Built for Desks</h4>
            <p className="text-sm text-muted">
              Sits under 27–34" monitors. USB‑C powered. Mounts via 3M adhesive or stand
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
