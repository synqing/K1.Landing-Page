import './globals.css'
import type { ReactNode } from 'react'

export const metadata = {
  title: 'K1-Lightwave — Founders Edition',
  description: 'First 100 units. Help us build V2.',
  openGraph: {
    title: 'K1-Lightwave — Founders Edition',
    description: 'First 100 units. Dual edge‑lit LGP, 320 LEDs, ESP32‑S3.',
    url: 'https://example.com',
    siteName: 'K1-Lightwave',
    images: [
      { url: '/og.png', width: 1200, height: 630, alt: 'K1-Lightwave' },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K1-Lightwave — Founders Edition',
    description: 'First 100 units. Dual edge‑lit LGP, 320 LEDs, ESP32‑S3.',
    images: ['/og.png'],
  },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <link rel="manifest" href="/site.webmanifest" />
      <body className="min-h-screen bg-background text-foreground antialiased">
        {/* JSON-LD Product snippet */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Product',
          name: 'K1-Lightwave — Founders Edition',
          description: 'Dual edge-lit LGP with 320 addressable LEDs on ESP32-S3',
          brand: { '@type': 'Brand', name: 'K1-Lightwave' },
          offers: {
            '@type': 'Offer', priceCurrency: 'USD', price: '249.00', availability: 'https://schema.org/PreOrder'
          }
        })}} />
        {children}
      </body>
    </html>
  )
}
