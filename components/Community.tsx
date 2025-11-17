import { CONFIG } from '@/lib/site-config'
import EmailCapture from '@/components/EmailCapture'

/**
 * A component that renders the community section.
 *
 * This section encourages users to join the community by providing links
 * to Discord and GitHub, and includes an email capture form.
 *
 * @returns {JSX.Element} The rendered community section.
 */
export default function Community() {
  return (
    <section className="container max-w-content mx-auto p-6 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          You&apos;re Not Buying a Product.
        </h2>
        <p className="text-xl md:text-2xl text-muted">
          You&apos;re joining a journey.
        </p>
      </div>

      {/* Three Icon Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="glass-inset rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">📬</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">Weekly Dev Updates</h3>
          <p className="text-muted">
            Behind-the-scenes. Firmware progress. Feature previews. No marketing fluff.
          </p>
        </div>

        <div className="glass-inset rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">💬</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">Founder&apos;s Discord</h3>
          <p className="text-muted">
            Direct access to dev team. Ask questions. Share patterns. Debug together.
          </p>
        </div>

        <div className="glass-inset rounded-2xl p-6 text-center">
          <div className="text-5xl mb-4">🗳️</div>
          <h3 className="text-xl md:text-2xl font-bold mb-3">Priority Input</h3>
          <p className="text-muted">
            Monthly surveys. Feature votes. Your needs shape what we build next.
          </p>
        </div>
      </div>

      {/* Founder's Edition Perks */}
      <div className="glass rounded-2xl p-8">
        <h3 className="text-2xl md:text-3xl font-bold mb-6 text-center">
          Founder&apos;s Edition Perks
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 max-w-3xl mx-auto">
          <div className="flex items-start gap-3">
            <span className="text-gold text-xl">✓</span>
            <div>
              <p className="font-semibold">Numbered Unit</p>
              <p className="text-sm text-muted">Laser-etched serial (e.g., &quot;23/100&quot;)</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gold text-xl">✓</span>
            <div>
              <p className="font-semibold">Lifetime Updates</p>
              <p className="text-sm text-muted">All firmware updates, forever</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gold text-xl">✓</span>
            <div>
              <p className="font-semibold">Beta Firmware Access</p>
              <p className="text-sm text-muted">New features before public release</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gold text-xl">✓</span>
            <div>
              <p className="font-semibold">20% Off V2</p>
              <p className="text-sm text-muted">When we launch the next gen</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gold text-xl">✓</span>
            <div>
              <p className="font-semibold">Credits</p>
              <p className="text-sm text-muted">Your name in firmware & docs</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <span className="text-gold text-xl">✓</span>
            <div>
              <p className="font-semibold">Open Hardware</p>
              <p className="text-sm text-muted">Schematics + firmware source on GitHub</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a className="button-primary" href={CONFIG.discordUrl} target="_blank" rel="noreferrer">
            Join Discord
          </a>
          <a className="button-secondary" href={CONFIG.githubUrl} target="_blank" rel="noreferrer">
            View on GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
