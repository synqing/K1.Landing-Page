/**
 * A component that renders the checkout page.
 *
 * This is currently a placeholder page that informs users about the upcoming
 * checkout integration. It provides a link to return to the main site.
 *
 * @returns {JSX.Element} The rendered checkout page.
 */
export default function Checkout() {
  return (
    <main className="container max-w-content mx-auto p-6 py-16">
      <h1 className="text-4xl font-bold mb-4">Reserve Your Founder&apos;s Edition</h1>
      <p className="text-muted mb-6">Checkout integration is coming. For now, join the Discord to get notified the moment reservations open.</p>
      <a className="button-primary" href="/">Back to site</a>
    </main>
  )
}

