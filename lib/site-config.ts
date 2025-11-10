import { ENV } from './env'

export const CONFIG = {
  price: ENV.NEXT_PUBLIC_PRICE,
  splitEnabled: ENV.NEXT_PUBLIC_SPLIT_ENABLED,
  unitsTotal: ENV.NEXT_PUBLIC_UNITS_TOTAL,
  unitsSold: ENV.NEXT_PUBLIC_UNITS_SOLD,
  shipDate: ENV.NEXT_PUBLIC_SHIP_DATE,
  discordUrl: ENV.NEXT_PUBLIC_DISCORD_URL,
  githubUrl: ENV.NEXT_PUBLIC_GITHUB_URL,
}

