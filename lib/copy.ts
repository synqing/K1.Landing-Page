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
      q: 'What exactly ships in March 2026?',
      a: 'Hardware: K1-Lightwave unit, USB-C cable, power adapter, mounting kit. Firmware: V1 with 12 preset patterns, music-reactive mode, WiFi control. Not included: PRISM.node (coming Q3 2026), mobile app (TBD).'
    },
    {
      q: 'Can I return it if I don\'t like it?',
      a: 'Yes. 30-day return window from delivery date. Full refund minus shipping. We\'re confident you\'ll love it, but we understand v1 isn\'t for everyone.'
    },
    {
      q: 'Is the firmware really open source?',
      a: 'Yes. Full source on GitHub (Apache 2.0 license). Hardware schematics too. Fork it, mod it, share it. We encourage hacking.'
    },
    {
      q: 'Will there be more than 100 units?',
      a: 'Yes, but not immediately. This is a limited founder\'s run. After we ship these 100 and gather feedback, we\'ll launch a full Kickstarter (Q3 2026) with v2 improvements. Founder\'s Edition holders get 20% off v2 + priority shipping.'
    },
    {
      q: 'What if something breaks?',
      a: '1-year hardware warranty covers defects. We\'ll replace or repair. For v1, we also offer Discord support (founders-only channel) where we troubleshoot together.'
    },
    {
      q: 'Why should I buy v1 instead of waiting for v2?',
      a: 'If you want to shape the product: Your feedback becomes features. If you want exclusivity: Only 100 numbered units exist. If you want savings: V2 will cost more (~$329). You get 20% off as a founder. If you want to wait: That\'s totally fine. We\'ll see you at the Kickstarter.'
    },
    {
      q: 'What\'s the difference between K1 and other LED strips?',
      a: 'It\'s not an LED strip. It\'s a dual edge-lit light guide plate. LEDs are hidden at the edges. Light diffuses through the acrylic. No hotspots, no visible LEDs. Clean, even glow. Also: 320 individually addressable LEDs (RGBIC), not RGB zones.'
    }
  ],
  product: {
    name: 'K1‑Lightwave — Founder\'s Edition',
    description: 'First 100 units. Dual edge‑lit LGP, 320 addressable LEDs, ESP32‑S3. Open hardware. V1 ships March 2026.',
  }
}

