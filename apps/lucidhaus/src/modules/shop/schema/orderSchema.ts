import { z } from 'zod'
import mongoose, { Types } from 'mongoose'

const orderProductSchema = z.object({
  product: z
    .instanceof(Types.ObjectId)
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId for product',
    }),
  quantity: z.number(),
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']).optional(),
})

const shippingAddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.string(),
})

const orderSchema = z.object({
  user: z
    .instanceof(Types.ObjectId)
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: 'Invalid ObjectId for user',
    }),
  email: z.string().email(),
  products: z.array(orderProductSchema),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
  totalPrice: z.number(),
  dateOrdered: z.date().optional(),
  dateShipped: z.date().optional(),
  shippingAddress: shippingAddressSchema.optional(),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
})

// Infer TypeScript type from Zod schema
export type OrderSchemaType = z.infer<typeof orderSchema>
