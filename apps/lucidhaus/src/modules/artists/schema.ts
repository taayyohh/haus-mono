import { z } from 'zod'
import mongoose, { ObjectId } from 'mongoose'

const ObjectId = mongoose.Types.ObjectId

export const artistSchema = z.object({
  name: z.string(),
  slug: z.string(),
  bio: z.string(),
  albums: z.array(z.instanceof(ObjectId)),
  heroImage: z.string(),
  socialLinks: z.object({
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    zora: z.string().url().optional(),
    futureTape: z.string().url().optional(),
    warpcast: z.string().url().optional(),
  }),
  ethereum: z.object({
    walletAddresses: z.array(z.string().regex(/^0x[a-fA-F0-9]{40}$/)),
    ensName: z.string().optional(),
  }),
})

// Infer TypeScript type from Zod schema
export type ArtistSchemaType = z.infer<typeof artistSchema>
