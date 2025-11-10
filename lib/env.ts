import { z } from 'zod'

/**
 * Defines the schema for environment variables using Zod.
 * This schema ensures that all required environment variables are present and correctly typed.
 */
const envSchema = z.object({
  NEXT_PUBLIC_PRICE: z.coerce.number().positive().int(),
  NEXT_PUBLIC_SPLIT_ENABLED: z.enum(['true', 'false']).transform(v => v === 'true'),
  NEXT_PUBLIC_UNITS_TOTAL: z.coerce.number().int().positive(),
  NEXT_PUBLIC_UNITS_SOLD: z.coerce.number().int().min(0),
  NEXT_PUBLIC_SHIP_DATE: z.string().min(1),
  NEXT_PUBLIC_DISCORD_URL: z.string().url(),
  NEXT_PUBLIC_GITHUB_URL: z.string().url(),
})

/**
 * Validates the environment variables against the defined schema.
 *
 * This function parses the environment variables from `process.env` and
 * returns a typed object if they are valid. If validation fails, it logs
 * an error and throws an exception.
 *
 * @returns {z.infer<typeof envSchema>} The validated environment variables.
 * @throws {Error} If the environment variables do not match the schema.
 */
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

/**
 * The validated and parsed environment variables for the application.
 * This object is exported for use throughout the codebase.
 */
export const ENV = validateEnv()
