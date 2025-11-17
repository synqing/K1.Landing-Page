/**
 * A component that renders the "Who Is This For?" section.
 *
 * This section helps visitors self-select by being honest about who will
 * love K1 vs who should wait for v2. It's a transparency/honesty filter
 * that aligns with the strategy of targeting early adopters who understand
 * they're getting v1 hardware.
 *
 * @returns {JSX.Element} The rendered "Who Is This For?" section.
 */
export default function WhoIsThisFor() {
  return (
    <section className="container max-w-content mx-auto p-6 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
        Is K1 Right For You?
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ideal Customer Card */}
        <div className="glass rounded-2xl p-8 border-l-4 border-ok">
          <h3 className="text-2xl md:text-3xl font-bold text-ok mb-4">
            ✓ You&apos;ll Love This If...
          </h3>
          <ul className="space-y-3 text-muted">
            <li className="flex items-start gap-3">
              <span className="text-ok mt-1">→</span>
              <span>You tinker with ESP32, Arduino, or Raspberry Pi</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ok mt-1">→</span>
              <span>You&apos;ve used WLED, FastLED, or similar LED projects</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ok mt-1">→</span>
              <span>Your desk setup is on r/battlestations (or should be)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ok mt-1">→</span>
              <span>You want the first dual edge-lit LGP light bar</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ok mt-1">→</span>
              <span>You&apos;re okay with &quot;v1&quot; rough edges</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-ok mt-1">→</span>
              <span>You want to shape what this becomes</span>
            </li>
          </ul>
        </div>

        {/* Not For You Card */}
        <div className="glass rounded-2xl p-8 border-l-4 border-warn">
          <h3 className="text-2xl md:text-3xl font-bold text-warn mb-4">
            ⚠️ This Isn&apos;t For You If...
          </h3>
          <ul className="space-y-3 text-muted">
            <li className="flex items-start gap-3">
              <span className="text-warn mt-1">→</span>
              <span>You want plug-and-play perfection</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-warn mt-1">→</span>
              <span>You need extensive customer support</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-warn mt-1">→</span>
              <span>You expect mobile apps and mature integrations now</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-warn mt-1">→</span>
              <span>You&apos;ve never flashed firmware or edited config files</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-warn mt-1">→</span>
              <span>You&apos;re buying this as a gift for someone non-technical</span>
            </li>
          </ul>

          <div className="mt-6 glass-inset rounded-xl p-4 border border-warn/30">
            <p className="text-sm font-semibold mb-2">We&apos;re being honest:</p>
            <p className="text-sm text-muted">
              V1 is for pioneers. If you need mature software, wait for our Kickstarter in Q3 2026.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
