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
