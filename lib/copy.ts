/**
 * @typedef {object} FAQItem
 * @property {string} q - The question for the FAQ.
 * @property {string} a - The answer to the FAQ question.
 */

/**
 * @typedef {object} ProductInfo
 * @property {string} name - The name of the product.
 * @property {string} description - A brief description of the product.
 */

/**
 * An object containing copy text for the application.
 * This includes frequently asked questions and product information.
 * @type {{faq: FAQItem[], product: ProductInfo}}
 */
export const COPY = {
  faq: [
    {
      q: 'Is V1 perfect?',
      a: 'No. V1 is functional, not flashy. You get 12 presets, music‑reactive mode, Wi‑Fi control, and open‑source firmware + schematics.'
    },
    {
      q: 'Can I hack it?',
      a: 'Yes. ESP32‑S3, open firmware, and community support. PRs welcome.'
    },
    {
      q: 'Does it work with WLED?',
      a: 'WLED compatibility is planned; early adopters help prioritize. Firmware is open, and integrations are on the roadmap.'
    },
    {
      q: 'What is the warranty?',
      a: '30‑day money‑back guarantee and 1‑year hardware warranty.'
    }
  ],
  product: {
    name: 'K1‑Lightwave — Founder\'s Edition',
    description: 'First 100 units. Dual edge‑lit LGP, 320 addressable LEDs, ESP32‑S3. Open hardware. V1 ships March 2026.',
  }
}

