/**
 * A component that demonstrates the usage of design tokens.
 *
 * This page serves as a simple visual reference for the project's
 * design tokens, such as colors, spacing, and typography, as
 * applied to a button element.
 *
 * @returns {JSX.Element} The rendered tokens demo page.
 */
export default function TokensDemo(){
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-2xl font-bold">Tokens Demo</h1>
      <div className="rounded-md border border-white/10 p-6 bg-background text-foreground">
        <p className="mb-3">Semantic button (bg-primary / text-foreground / rounded-md)</p>
        <button className="bg-primary text-foreground rounded-md px-4 py-2">Primary</button>
      </div>
    </main>
  )
}
