/**
 * A component that renders the site footer.
 *
 * This component displays the copyright notice with the current year.
 *
 * @returns {JSX.Element} The rendered footer component.
 */
export default function Footer() {
  return (
    <footer className="container max-w-content mx-auto p-6 py-16">
      <div className="text-xs text-muted">© {new Date().getFullYear()} K1‑Lightwave — Founders Edition</div>
    </footer>
  )
}

