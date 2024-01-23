import { Schema, model, Types } from 'mongoose'
import { ICategory } from '@/models/Category'
import { IArtist } from '@/models/Artist'
import slugify from 'slugify'

export type StockSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export interface Stock {
  size: StockSize
  quantity: number
}

export interface IProduct {
  _id?: string
  name: string
  price: number
  description: string
  category?: ICategory
  imageUri: string[]
  stripeId: string
  slug: string
  artists:  string[]
  quantity?: number
  stock?: Stock[]
}

const stockSchema = new Schema({
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
  quantity: { type: Number, required: true },
})

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: Types.ObjectId, ref: 'Category' },
  imageUri: { type: [String], required: true },
  stripeId: { type: String, required: true },
  slug: { type: String, unique: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  quantity: { type: Number, default: 0 }, // Default value added for non-sized products
  stock: [stockSchema],
})

productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Product = model('Product', productSchema)

export default Product
