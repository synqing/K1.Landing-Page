import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <div className="text-6xl font-bold mb-4 text-gold">404</div>
        <h1 className="text-2xl font-bold mb-2">Page Not Found</h1>
        <p className="text-muted mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link href="/" className="button-primary inline-block">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
