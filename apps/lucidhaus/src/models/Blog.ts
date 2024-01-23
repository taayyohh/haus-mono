import mongoose, { Schema, model, ObjectId } from 'mongoose'
import slugify from 'slugify'

export interface IBlogPost {
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

blogPostSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const BlogPost = model('BlogPost', blogPostSchema)

export default BlogPost
