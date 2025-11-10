export const CONFIG = {
  price: Number(process.env.NEXT_PUBLIC_PRICE ?? 249),
  splitEnabled: (process.env.NEXT_PUBLIC_SPLIT_ENABLED ?? 'true') === 'true',
  unitsTotal: Number(process.env.NEXT_PUBLIC_UNITS_TOTAL ?? 100),
  unitsSold: Number(process.env.NEXT_PUBLIC_UNITS_SOLD ?? 27),
  shipDate: String(process.env.NEXT_PUBLIC_SHIP_DATE ?? 'March 2026'),
  discordUrl: String(process.env.NEXT_PUBLIC_DISCORD_URL ?? 'https://discord.gg/placeholder'),
  githubUrl: String(process.env.NEXT_PUBLIC_GITHUB_URL ?? 'https://github.com/placeholder'),
}

