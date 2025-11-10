import Link from 'next/link'

/**
 * A component that renders the 404 "Not Found" page.
 *
 * This component is displayed by Next.js when a user navigates to a route
 * that does not exist. It provides a clear message and a link to return
 * to the homepage.
 *
 * @returns {JSX.Element} The rendered 404 page.
 */
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
