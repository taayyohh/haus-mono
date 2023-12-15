import { z } from 'zod'
import mongoose, { Types } from 'mongoose'

// Define the Zod schema for the Stock type
const stockSchema = z.object({
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  quantity: z.number(),
})

const productSchema = z.object({
  name: z.string(),
  price: z.number(),
  description: z.string(),
  category: z
    .instanceof(Types.ObjectId)
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId for category',
    }),
  imageUri: z.string(),
  stripeId: z.string(),
  slug: z.string(),
  artists: z.array(z.union([z.instanceof(Types.ObjectId), z.string()])),
  quantity: z.number().optional(),
  stock: z.array(stockSchema).optional(),
})

// Infer TypeScript type from Zod schema
export type ProductSchemaType = z.infer<typeof productSchema>
