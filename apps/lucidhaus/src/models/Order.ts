import mongoose, { Schema, model, Types } from 'mongoose'
import { z } from 'zod'
import { IProduct, zodProductSchema } from '@/models/Product'

// Interface for OrderProduct
export interface OrderProduct {
  product: IProduct
  quantity: number
  size?: string
}

// Zod schema for OrderProduct
const zodOrderProductSchema = z.object({
  product: zodProductSchema,
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']).optional(),
})

// Zod schema for IOrder
export const zodShippingAddressSchema = z.object({
  city: z.string(),
  country: z.string(),
  line1: z.string(),
  line2: z.string().nullish(),
  state: z.string(),
  postal_code: z.string(),
})

export const zodOrderSchema = z.object({
  _id: z.string().optional(), // make optional because not submitted on form submission
  privyId: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  products: z.array(zodOrderProductSchema),
  status: z.enum(['pending', 'processing', 'shipped', 'delivered', 'canceled']),
  totalPrice: z.number().min(0, 'Total Price must be a non-negative number'),
  dateOrdered: z.string().optional(),
  dateShipped: z.string().optional(),
  shippingAddress: zodShippingAddressSchema.optional(),
  trackingNumber: z.string().optional(),
  notes: z.string().optional(),
})

// Infer a TypeScript type from the Zod schema
export type IOrder = z.infer<typeof zodOrderSchema>

// Mongoose schemas
const orderProductSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
})

const orderSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  privyId: String,
  products: [orderProductSchema],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    required: true,
  },
  totalPrice: { type: Number, required: true },
  dateOrdered: { type: Date, default: Date.now },
  dateShipped: Date,
  shippingAddress: {
    city: { type: String, required: true },
    country: { type: String, required: true },
    line1: { type: String, required: true },
    line2: { type: String },
    state: String,
    postal_code: { type: String, required: true },
  },
  trackingNumber: String,
  notes: String,
})

const Order = mongoose.models?.Order || model<IOrder>('Order', orderSchema)

export default Order
