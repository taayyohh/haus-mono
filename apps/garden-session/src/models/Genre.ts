import { Document, model, Schema } from 'mongoose'
import * as mongoose from 'mongoose'
import slugify from 'slugify' // Ensure the path is correct

export interface IGenre extends Document {
  name: string // Name of the genre e.g., Rock, Jazz, etc.
  slug: string // URL-friendly version of the genre name
  description?: string // Optional description for the genre
}

const genreSchema = new Schema<IGenre>({
  name: { type: String, required: true, unique: true },
  slug: { type: String, unique: true },
  description: String,
})

// Pre-save hook to automatically generate the slug based on the name field
genreSchema.pre<IGenre>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Genre = mongoose.models.Genre || model<IGenre>('Genre', genreSchema)

export default Genre
