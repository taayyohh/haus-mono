import mongoose, { Schema, model, Document, ObjectId } from 'mongoose'
import slugify from 'slugify'

export interface IBlogPost extends Document {
  title: string
  publishedDate: Date
  description: string
  primaryArtist: ObjectId
  thumbnailUri?: string
  tags: string[]
  collectionAddress: `0x${string}`
  slug: string
}

const blogPostSchema = new Schema<IBlogPost>({
  title: { type: String, required: true },
  publishedDate: { type: Date, required: true },
  description: { type: String, required: true },
  primaryArtist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  thumbnailUri: { type: String },
  tags: [{ type: String }],
  collectionAddress: { type: String, required: true },
  slug: { type: String, unique: true },
})

// Pre-save hook to automatically generate the slug based on the title
blogPostSchema.pre<IBlogPost>('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

// Check if the model is already compiled
const BlogPost = mongoose.models.BlogPost || model<IBlogPost>('BlogPost', blogPostSchema)

export default BlogPost
