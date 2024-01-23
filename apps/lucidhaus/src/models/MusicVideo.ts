import { Schema, model, ObjectId } from 'mongoose'
import slugify from 'slugify'

export interface IMusicVideo {
  title: string
  releaseDate: Date
  song: string
  primaryArtist: ObjectId
  artists: ObjectId[] | string[]
  associatedAlbum: ObjectId
  videoUri: string
  thumbnailUri: string
  director: string
  producers: string[]
  cinematographers: string[]
  choreographers: string[]
  videoEditors: string[]
  productionCompany: string
  locations: string[]
  cameoAppearances: string[]
  videoNotes: string
  collectionAddress: `0x${string}`
  slug: string
}

const musicVideoSchema = new Schema({
  title: { type: String, required: true },
  releaseDate: { type: Date, required: true },
  song: { type: String },
  primaryArtist: { type: Schema.Types.ObjectId, ref: 'Artist', required: true },
  artists: [{ type: Schema.Types.ObjectId, ref: 'Artist' }],
  associatedAlbum: { type: Schema.Types.ObjectId, ref: 'Album' },
  videoUri: { type: String },
  thumbnailUri: { type: String },
  director: { type: String },
  producers: [{ type: String }],
  cinematographers: [{ type: String }],
  choreographers: [{ type: String }],
  videoEditors: [{ type: String }],
  productionCompany: { type: String },
  locations: [{ type: String }],
  cameoAppearances: [{ type: String }],
  videoNotes: { type: String },
  collectionAddress: { type: String, required: true },
  slug: { type: String, unique: true },
})

musicVideoSchema.pre('save', function (next) {
  if (this.isModified('title') || this.isModified('primaryArtists')) {
    this.slug = slugify(this.title, { lower: true, remove: /[*+~.()'"!:@]/g })
  }
  next()
})

const MusicVideo = model<IMusicVideo>('MusicVideo', musicVideoSchema)

export default MusicVideo
