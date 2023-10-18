import { Document, model, Schema } from 'mongoose'
import * as mongoose from 'mongoose'
import slugify from 'slugify'
import { IGenre } from '@/models/Genre'

export interface ICategory extends Document {
  name: string
  slug: string
}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
})

categorySchema.pre<ICategory>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Category = mongoose.models.Category || model<ICategory>('Category', categorySchema)

export default Category
