export default function HardwareShowcase() {
  return (
    <section id="learn" className="container max-w-content mx-auto p-6 py-16">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-10">What Makes K1 Different</h2>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-8 md:row-span-2 glass rounded-2xl p-4 min-h-[300px] flex items-center justify-center">
          <span className="text-muted">Large rotating product video (placeholder)</span>
        </div>
        <div className="md:col-span-4 glass-inset rounded-2xl p-5">
          <h3 className="uppercase tracking-wider text-sm text-muted mb-2">Dual Edge‑Lit LGP</h3>
          <p className="text-sm">First consumer device with dual-edge illumination. Light enters from both sides for even diffusion with zero hotspots.</p>
        </div>
        <div className="md:col-span-4 glass-inset rounded-2xl p-5">
          <h3 className="uppercase tracking-wider text-sm text-muted mb-2">320 Addressable LEDs</h3>
          <p className="text-sm">True per‑LED control (RGBIC). 160 LEDs per edge. Powered by ESP32‑S3 dual‑core.</p>
        </div>
        <div className="md:col-span-12 glass rounded-2xl p-6">
          <h4 className="font-semibold mb-2">Built for Desks</h4>
          <p className="text-sm text-muted">32cm length; sits under 27–34" monitors. USB‑C powered. Mounts via 3M adhesive or stand.</p>
        </div>
      </div>
    </section>
  )
}

