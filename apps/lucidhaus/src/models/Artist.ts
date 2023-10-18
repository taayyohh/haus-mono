import { Document, model, Schema, Types } from 'mongoose'
import * as mongoose from 'mongoose'
import { IGenre } from './Genre'
import slugify from 'slugify' // Adjust path as needed

export interface IArtist extends Document {
  name: string // Artist's full name or stage name
  slug: string
  bio: string // Short biography or description
  albums: string[] // List of album names/IDs associated with this artist
  heroImage: string // URL of the artist's primary promotional image
  socialLinks: {
    // Links to various social platforms
    twitter?: string
    instagram?: string
    zora?: string
    futureTape?: string
    warpcast?: string
  }
  ethereum: {
    walletAddresses: string[] // Ethereum wallet addresses, format as `0x${string}`
    ensName: string // ENS (Ethereum Name Service) name for easy address lookup
  }
  // ... additional fields as needed
}

const artistSchema = new Schema<IArtist>({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  bio: { type: String, required: true },
  albums: [{ type: String }],
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
  // ... additional schema fields as needed
})

// Pre-save hook to automatically generate the slug based on the name field
artistSchema.pre<IArtist>('save', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const Artist = mongoose.models.Artist || model<IArtist>('Artist', artistSchema)

export default Artist
