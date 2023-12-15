import { z } from 'zod'

const privyUserSchema = z.object({
  id: z.string(),
  createdAt: z.date(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  wallet: z.string().optional(),
  google: z.string().optional(),
  twitter: z.string().optional(),
  discord: z.string().optional(),
  github: z.string().optional(),
  tiktok: z.string().optional(),
  linkedin: z.string().optional(),
  apple: z.string().optional(),
})

const userSchema = z.object({
  privyId: z.string().min(1, 'Privy ID is required'),
  customer: z.any(), // Define more specifically if possible
  privyUser: privyUserSchema,
  role: z.string().optional(),
})

// Infer TypeScript type from Zod schema
export type UserSchemaType = z.infer<typeof userSchema>
