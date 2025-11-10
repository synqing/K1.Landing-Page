import type { MetadataRoute } from 'next'

/**
 * Generates the `sitemap.xml` file for the website.
 *
 * This function is used by Next.js to create a sitemap that lists the
 * pages on the site, helping search engines to better index it.
 *
 * @returns {MetadataRoute.Sitemap} An array of sitemap entry objects.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://example.com'
  return [
    { url: `${base}/`, lastModified: new Date() },
    { url: `${base}/checkout`, lastModified: new Date() },
  ]
}

