import mongoose, { model, Schema } from 'mongoose'
import slugify from 'slugify'
import { z } from 'zod'

// Defining a sub-schema for stock items using Mongoose's Schema.
const stockSchema = new Schema({
  size: { type: String, enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL'], required: true },
  quantity: { type: Number, required: true },
})

// Defining the main product schema using Mongoose's Schema.
const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  // category: { type: Schema.Types.ObjectId, ref: 'Category' },
  imageUri: { type: [String], required: true },
  stripeId: { type: String, required: true },
  slug: { type: String, unique: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  quantity: { type: Number, default: 0 }, // Default value added for non-sized products
  stock: [stockSchema],
})

// Defining a Zod schema for stock items for runtime validation.
const zodStockItemSchema = z.object({
  _id: z.string().optional(),
  size: z.enum(['XS', 'S', 'M', 'L', 'XL', 'XXL']),
  quantity: z.number().min(0),
})

// Defining a Zod schema for products for runtime validation.
export const zodProductSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, 'Name is required'),
  price: z.number().min(0, 'Price must be a positive number'),
  description: z.string().min(10, 'Description is required'),
  // // category: z.string(),
  imageUri: z.array(z.string()),
  stripeId: z.string().optional(),
  slug: z.string().optional(),
  artists: z.array(z.string()),
  quantity: z.number().min(0).optional(),
  stock: z.array(zodStockItemSchema).optional(),
})

// Infer a TypeScript type from the Zod schema for static type checking.
export type IProduct = z.infer<typeof zodProductSchema>
export type IStock = z.infer<typeof zodStockItemSchema>

// Pre-save middleware for the product schema.
// Automatically generates and updates the slug before saving the product.
productSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    // Slugify the product name to create a URL-friendly slug.
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

// Creating a Mongoose model from the product schema.
// This model will be used to interact with the 'products' collection in MongoDB.
const Product = mongoose.models?.Product || model('Product', productSchema)

export default Product
