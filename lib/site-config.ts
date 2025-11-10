import { ENV } from './env'

/**
 * A centralized configuration object for the site.
 *
 * This object pulls values from the validated environment variables (`ENV`)
 * and exposes them in a clean, easily accessible structure. It's used to
 * configure various parts of the application, such as pricing, feature flags,
 * and external links.
 */
export const CONFIG = {
  price: ENV.NEXT_PUBLIC_PRICE,
  splitEnabled: ENV.NEXT_PUBLIC_SPLIT_ENABLED,
  unitsTotal: ENV.NEXT_PUBLIC_UNITS_TOTAL,
  unitsSold: ENV.NEXT_PUBLIC_UNITS_SOLD,
  shipDate: ENV.NEXT_PUBLIC_SHIP_DATE,
  discordUrl: ENV.NEXT_PUBLIC_DISCORD_URL,
  githubUrl: ENV.NEXT_PUBLIC_GITHUB_URL,
}

