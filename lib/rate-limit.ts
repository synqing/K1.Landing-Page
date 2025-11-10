import { LRUCache } from 'lru-cache'

type RateLimitOptions = {
  max?: number
  window?: number // in milliseconds
}

const defaultOptions: Required<RateLimitOptions> = {
  max: 5, // 5 requests
  window: 60000, // per 60 seconds
}

const cache = new LRUCache<string, number>({
  max: 500,
  ttl: defaultOptions.window,
})

/**
 * Checks if a given identifier has exceeded a request limit within a time window.
 *
 * This function uses an in-memory LRU cache to track the number of requests
 * for a given identifier. If the count exceeds the configured maximum, it
 * returns `false`; otherwise, it increments the count and returns `true`.
 *
 * @param {string} identifier - A unique string for the entity being rate-limited (e.g., an IP address or API key).
 * @param {RateLimitOptions} [options={}] - Optional configuration for `max` requests and `window` duration in milliseconds.
 * @returns {boolean} `true` if the request is within the limit, `false` otherwise.
 */
export function rateLimit(
  identifier: string,
  options: RateLimitOptions = {}
): boolean {
  const { max, window } = { ...defaultOptions, ...options }

  const count = (cache.get(identifier) as number) || 0

  if (count >= max) {
    console.warn(`[rate-limit] Limit exceeded for ${identifier}`)
    return false
  }

  cache.set(identifier, count + 1, { ttl: window })
  return true
}

/**
 * Extracts a unique identifier from an incoming request for rate-limiting purposes.
 *
 * It checks for common proxy headers like `x-forwarded-for` and `x-real-ip`
 * to determine the original client IP address.
 *
 * @param {Request} req - The incoming `Request` object.
 * @returns {string} The determined identifier (e.g., IP address) or 'unknown' if not found.
 */
export function getRateLimitIdentifier(req: Request): string {
  // Try to get real IP from headers (behind proxy/CDN)
  const forwarded = req.headers.get('x-forwarded-for')
  const realIp = req.headers.get('x-real-ip')

  if (forwarded) {
    const ips = forwarded.split(',')
    return ips[0].trim()
  }

  if (realIp) {
    return realIp
  }

  // Fallback to a generic identifier
  return 'unknown'
}
