import { COPY } from '@/lib/copy'

/**
 * A component that renders the Frequently Asked Questions (FAQ) section.
 *
 * This component displays a list of questions and answers sourced from the
 * `COPY.faq` object. It arranges them in a two-column grid on larger screens.
 *
 * @returns {JSX.Element} The rendered FAQ section.
 */
export default function FAQ() {
  return (
    <section className="container max-w-content mx-auto p-6 py-16">
      <h3 className="text-3xl font-bold mb-6">FAQ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {COPY.faq.map((item, i) => (
          <div key={i} className="glass-inset rounded-2xl p-6">
            <h4 className="font-semibold mb-2">{item.q}</h4>
            <p className="text-sm text-muted">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
