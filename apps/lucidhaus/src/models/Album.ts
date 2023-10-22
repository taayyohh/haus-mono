import mongoose, { Schema, model, Document, Types, ObjectId } from 'mongoose'
import slugify from 'slugify'

export interface IAlbum extends Document {
  title: string
  releaseDate: Date
  genre: ObjectId
  coverImageUri: string
  tracks: ITrack[]
  primaryArtist: ObjectId
  artists: ObjectId[]
  collectionAddress: string
  slug: string
  label: string
  producers: string[]
  mixers: string[]
  masteringEngineers: string[]
  recordingEngineers: string[]
  studios: string[]
  additionalMusicians: string[]
  albumNotes: string
  catalogNumber: string
}

interface ITrack {
  title: string
  duration: number
  featuredArtists: ObjectId[] | string[]
  writers: string[]
  producers: string[]
  tokenId: string
}

const albumSchema = new Schema<IAlbum>({
  title: { type: String, required: true },
  releaseDate: { type: Date },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre' }, // Referencing the Genre model
  coverImageUri: { type: String },
  tracks: [
    {
      title: { type: String },
      duration: { type: Number },
      featuredArtists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
      writers: [{ type: String }],
      producers: [{ type: String }],
      tokenId: { type: String },
    },
  ],
  primaryArtist: { type: Schema.Types.ObjectId, ref: 'Artist' },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  collectionAddress: { type: String },
  slug: { type: String, unique: true },
  label: { type: String },
  producers: [{ type: String }],
  mixers: [{ type: String }],
  masteringEngineers: [{ type: String }],
  recordingEngineers: [{ type: String }],
  studios: [{ type: String }],
  additionalMusicians: [{ type: String }],
  albumNotes: { type: String },
  catalogNumber: { type: String}
})

// Pre-save hook to automatically generate the slug based on the title field
albumSchema.pre<IAlbum>('save', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

// Check if the model is already compiled
const Album = mongoose.models.Album || model<IAlbum>('Album', albumSchema)

export default Album
