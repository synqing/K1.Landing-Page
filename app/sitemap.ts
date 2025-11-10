import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com'
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/checkout`, lastModified: new Date() },
  ]
}

