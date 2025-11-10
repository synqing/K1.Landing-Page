import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_PRICE: z.coerce.number().positive().int(),
  NEXT_PUBLIC_SPLIT_ENABLED: z.enum(['true', 'false']).transform(v => v === 'true'),
  NEXT_PUBLIC_UNITS_TOTAL: z.coerce.number().int().positive(),
  NEXT_PUBLIC_UNITS_SOLD: z.coerce.number().int().min(0),
  NEXT_PUBLIC_SHIP_DATE: z.string().min(1),
  NEXT_PUBLIC_DISCORD_URL: z.string().url(),
  NEXT_PUBLIC_GITHUB_URL: z.string().url(),
})

export function validateEnv() {
  try {
    return envSchema.parse({
      NEXT_PUBLIC_PRICE: process.env.NEXT_PUBLIC_PRICE,
      NEXT_PUBLIC_SPLIT_ENABLED: process.env.NEXT_PUBLIC_SPLIT_ENABLED,
      NEXT_PUBLIC_UNITS_TOTAL: process.env.NEXT_PUBLIC_UNITS_TOTAL,
      NEXT_PUBLIC_UNITS_SOLD: process.env.NEXT_PUBLIC_UNITS_SOLD,
      NEXT_PUBLIC_SHIP_DATE: process.env.NEXT_PUBLIC_SHIP_DATE,
      NEXT_PUBLIC_DISCORD_URL: process.env.NEXT_PUBLIC_DISCORD_URL,
      NEXT_PUBLIC_GITHUB_URL: process.env.NEXT_PUBLIC_GITHUB_URL,
    })
  } catch (error) {
    console.error('[env] Validation failed:', error)
    throw new Error('Invalid environment configuration. Check .env file.')
  }
}

export const ENV = validateEnv()
