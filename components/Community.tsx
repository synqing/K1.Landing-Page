import { CONFIG } from '@/lib/site-config'
import EmailCapture from '@/components/EmailCapture'

export default function Community() {
  return (
    <section className="container max-w-content mx-auto p-6 py-16">
      <div className="glass rounded-2xl p-8">
        <h3 className="text-3xl font-bold mb-3">Join the Founders</h3>
        <p className="text-muted max-w-2xl">Founders shape the roadmap. Get weekly updates, early firmware, and a direct line to the team.</p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a className="button-primary" href={CONFIG.discordUrl} target="_blank" rel="noreferrer">Join Discord</a>
          <a className="button-secondary" href={CONFIG.githubUrl} target="_blank" rel="noreferrer">View on GitHub</a>
        </div>
        <div className="mt-6">
          <EmailCapture />
        </div>
      </div>
    </section>
  )
}
