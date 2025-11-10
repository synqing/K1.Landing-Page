"use client"
import { useExperiment } from '@/lib/experiments'

export default function VisionSticky() {
  const placement = useExperiment('specs_placement', ['overlay', 'card'])

  return (
    <section className="container max-w-content mx-auto p-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="md:sticky md:top-6 h-fit glass rounded-2xl p-6">
          <h3 className="text-3xl font-bold mb-3">What Ships Now</h3>
          <p className="text-muted mb-4">V1 firmware is functional, not flashy. You get:</p>
          <ul className="space-y-1 text-sm">
            <li>✓ 12 preset patterns</li>
            <li>✓ Music‑reactive (spectrum analyzer)</li>
            <li>✓ Wi‑Fi control</li>
            <li>✓ Open source firmware + schematics</li>
          </ul>
        </div>
        <div className="space-y-6">
          <div className="glass-inset rounded-2xl p-6">
            <h4 className="font-semibold mb-2">Coming Soon</h4>
            <ul className="list-disc list-inside text-sm text-muted">
              <li>PRISM.node visual programming</li>
              <li>Pattern marketplace</li>
              <li>Advanced music analysis</li>
              <li>Home Assistant / WLED</li>
              <li>Mobile app</li>
            </ul>
          </div>
          {placement === 'card' && (
            <div className="glass-inset rounded-2xl p-6">
              <h4 className="font-semibold mb-2">Quick Specs</h4>
              <ul className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted">
                <li>320 RGB LEDs</li>
                <li>ESP32‑S3</li>
                <li>Dual edge‑lit LGP</li>
                <li>USB‑C power</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

