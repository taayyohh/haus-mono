import { Schema, model, Document, Types } from 'mongoose'
import { ICategory } from '@/models/Category'
import { IArtist } from '@/models/Artist'
import mongoose from 'mongoose'
import slugify from 'slugify'

interface Stock {
  size: string // 'XS', 'S', 'M', 'L', 'XL', 'XXL'
  quantity: number
}

export interface IProduct extends Document {
  name: string
  price: number
  description: string
  category: ICategory
  imageUri: string
  stripeId: string
  slug: string
  artists: IArtist[] | string[]
  quantity?: number // For products without sizes
  stock?: Stock[] // For products with sizes
}

const stockSchema = new Schema({
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
  quantity: { type: Number, required: true },
})

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'Category', required: true },
  imageUri: { type: String, required: true },
  stripeId: { type: String, required: true },
  slug: { type: String, unique: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  quantity: { type: Number, default: 0 }, // Default value added for non-sized products
  stock: [stockSchema],
})

// Pre-save hook to automatically generate the slug based on the name field
productSchema.pre<IProduct>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

// Check if the model is already compiled
const Product = mongoose.models.Product || model<IProduct>('Product', productSchema)

export default Product
