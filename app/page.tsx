export default function Page() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <section className="space-y-2">
        <h1 className="text-2xl font-bold">K1 Tokens Wired</h1>
        <p className="text-foreground/80">Tailwind preset from tokens-web; CSS variables imported globally.</p>
      </section>
      <div className="rounded-md border border-white/10 p-6 bg-background">
        <h2 className="text-xl font-semibold mb-2">Semantic Button</h2>
        <button className="bg-primary text-foreground rounded-md px-4 py-2">Primary</button>
      </div>
    </main>
  )
}
