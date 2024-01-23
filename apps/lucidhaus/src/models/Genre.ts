import { model, Schema } from 'mongoose'
import slugify from 'slugify'

export interface IGenre {
  _id: string
  name: string
  slug: string
  description?: string
}

const genreSchema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: String,
})

// Pre-save hook to automatically generate the slug based on the name field
genreSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Genre = model<IGenre>('Genre', genreSchema)

export default Genre
