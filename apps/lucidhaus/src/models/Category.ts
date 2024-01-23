import { model, Schema } from 'mongoose'
import slugify from 'slugify'

export interface ICategory {
  name: string
  slug: string
}

const categorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
})

categorySchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Category = model('Category', categorySchema)

export default Category
