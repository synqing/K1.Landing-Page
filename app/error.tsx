'use client'

/**
 * A component that renders as a fallback UI when an error is thrown.
 *
 * This component is used by Next.js to gracefully handle runtime errors
 * in a route segment. It displays a user-friendly message and provides
 * options to retry the action or navigate to the homepage.
 *
 * In development mode, it also displays detailed error information.
 *
 * @param {object} props - The component's props.
 * @param {Error & { digest?: string }} props.error - The error that was thrown.
 * @param {() => void} props.reset - A function to reset the error boundary and re-render the component.
 * @returns {JSX.Element} The rendered error page.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('[app] Error boundary caught:', error)

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <div className="glass rounded-2xl p-8 text-center max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold mb-2">Something Went Wrong</h1>
        <p className="text-muted mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        <div className="flex gap-3 justify-center">
          <button onClick={() => reset()} className="button-primary">
            Try Again
          </button>
          <a href="/" className="button-secondary">
            Go Home
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="text-xs text-muted cursor-pointer">
              Error Details (dev only)
            </summary>
            <pre className="mt-2 text-xs text-err bg-surface/50 p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
