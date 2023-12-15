import { z } from 'zod'
import { Types } from 'mongoose'

const trackSchema = z.object({
  title: z.string(),
  duration: z.number(),
  featuredArtists: z.array(z.union([z.instanceof(Types.ObjectId), z.string()])),
  writers: z.array(z.string()),
  producers: z.array(z.string()),
  tokenId: z.string(),
})

const albumSchema = z.object({
  title: z.string(),
  releaseDate: z.date().optional(),
  genre: z.instanceof(Types.ObjectId),
  coverImageUri: z.string().optional(),
  tracks: z.array(trackSchema),
  primaryArtist: z.instanceof(Types.ObjectId),
  artists: z.array(z.instanceof(Types.ObjectId)),
  collectionAddress: z.string(),
  slug: z.string(),
  label: z.string().optional(),
  producers: z.array(z.string()).optional(),
  mixers: z.array(z.string()).optional(),
  masteringEngineers: z.array(z.string()).optional(),
  recordingEngineers: z.array(z.string()).optional(),
  studios: z.array(z.string()).optional(),
  additionalMusicians: z.array(z.string()).optional(),
  albumNotes: z.string().optional(),
  catalogNumber: z.string().optional(),
})

// Infer TypeScript type from Zod schema
export type AlbumSchemaType = z.infer<typeof albumSchema>
