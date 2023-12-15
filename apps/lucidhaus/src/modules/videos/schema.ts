import { z } from 'zod'

const musicVideoSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  releaseDate: z.date(),
  song: z.string().optional(),
  primaryArtist: z.string(), // Assuming ObjectId is represented as a string
  artists: z.array(z.string()).optional(), // Adjust based on actual representation of ObjectId
  associatedAlbum: z.string().optional(), // Adjust for ObjectId
  videoUri: z.string().url().optional(),
  thumbnailUri: z.string().url().optional(),
  director: z.string().optional(),
  producers: z.array(z.string()).optional(),
  cinematographers: z.array(z.string()).optional(),
  choreographers: z.array(z.string()).optional(),
  videoEditors: z.array(z.string()).optional(),
  productionCompany: z.string().optional(),
  locations: z.array(z.string()).optional(),
  cameoAppearances: z.array(z.string()).optional(),
  videoNotes: z.string().optional(),
  collectionAddress: z.string().regex(/^0x[a-fA-F0-9]{40}$/, 'Invalid Ethereum address'),
  slug: z.string().min(1, 'Slug is required'),
})

// Infer TypeScript type from Zod schema
export type MusicVideoSchemaType = z.infer<typeof musicVideoSchema>
