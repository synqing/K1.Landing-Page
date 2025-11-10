import type { MetadataRoute } from 'next'

/**
 * Generates the `robots.txt` file for the website.
 *
 * This function is used by Next.js to create a `robots.txt` file that
 * instructs web crawlers on how to index the site. It allows all user
 * agents to crawl the entire site and provides a link to the sitemap.
 *
 * @returns {MetadataRoute.Robots} The robots.txt configuration object.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://example.com/sitemap.xml',
  }
}

