import { model, ObjectId, Schema } from 'mongoose'
import * as mongoose from 'mongoose'
import slugify from 'slugify'

export interface IArtist {
  _id: string
  name: string
  slug: string
  bio: string
  albums: ObjectId[]
  heroImage: string
  socialLinks: {
    twitter?: string
    instagram?: string
    zora?: string
    futureTape?: string
    warpcast?: string
  }
  ethereum: {
    walletAddresses: string[]
    ensName: string
  }
}

const artistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  bio: { type: String, required: true },
  albums: [{ type: Schema.Types.ObjectId, ref: 'Album' }],
  heroImage: { type: String, required: true },
  socialLinks: {
    twitter: String,
    instagram: String,
    zora: String,
    futureTape: String,
    warpcast: String,
  },
  ethereum: {
    walletAddresses: [{ type: String, match: /^0x[a-fA-F0-9]{40}$/ }], // Using a regex to ensure valid Ethereum addresses
    ensName: { type: String },
  },
})

// Pre-save hook to automatically generate the slug based on the name field
artistSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Artist = mongoose.models.Artist || model<IArtist>('Artist', artistSchema)

export default Artist
