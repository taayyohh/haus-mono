import mongoose, { Schema, model, Document, Types } from 'mongoose'
import { IProduct } from '@/models/Product'

export interface OrderProduct {
  product: IProduct
  quantity: number
  size?: string // This is optional, as not all products will have sizes
}

export interface IOrder extends Document {
  user: Types.ObjectId // Reference to User model if you have one
  email: string,
  products: OrderProduct[]
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'canceled'
  totalPrice: number
  dateOrdered: Date
  dateShipped?: Date // This is optional as the order might not be shipped immediately
  shippingAddress: {
    street: string
    city: string
    state?: string // If applicable
    postalCode: string
    country: string
  }
  trackingNumber?: string
  notes?: string
}

const orderProductSchema = new Schema({
  product: { type: Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'] },
})

const orderSchema = new Schema<IOrder>({
  email: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  products: [orderProductSchema],
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'canceled'],
    required: true,
  },
  totalPrice: { type: Number, required: true },
  dateOrdered: { type: Date, default: Date.now },
  // dateShipped: Date,
  // shippingAddress: {
  //   street: { type: String, required: true },
  //   city: { type: String, required: true },
  //   state: String,
  //   postalCode: { type: String, required: true },
  //   country: { type: String, required: true },
  // },
  trackingNumber: String,
  notes: String,
})

const Order = mongoose.models.Order || model<IOrder>('Order', orderSchema)

export default Order
