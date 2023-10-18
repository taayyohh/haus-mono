import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import Artist, { IArtist } from '@/models/Artist'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import mongoose from 'mongoose'
const ObjectId = mongoose.Types.ObjectId

export const GET = connectDb(async (req) => {
  const slugOrId = req.nextUrl.pathname.split('/')[3]

  // If slugOrId is provided, try to fetch the artist by slug or ObjectId
  if (slugOrId) {
    try {
      // Check if slugOrId is a valid ObjectId
      let query
      if (ObjectId.isValid(slugOrId)) {
        query = { _id: new ObjectId(slugOrId) }
      } else {
        query = { slug: slugOrId }
      }

      const artist: IArtist | null = await Artist.findOne(query).exec()
      if (!artist) {
        return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
      }
      return NextResponse.json(artist, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error fetching artist' }, { status: 500 })
    }
  }

  // If no slugOrId is provided, continue with the pagination logic
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const artists: IArtist[] = await Artist.find({}).skip(skip).limit(limit).exec()
    return NextResponse.json(artists, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching artists' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const artistId = req.nextUrl.searchParams.get('id')
    const { name } = await req.json()

    try {
      const artist = await Artist.findByIdAndUpdate(artistId, { name }, { new: true })

      if (!artist) {
        return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
      }

      return NextResponse.json(artist, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating artist' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const artistId = req.nextUrl.searchParams.get('id')

    try {
      const artist = await Artist.findByIdAndDelete(artistId)

      if (!artist) {
        return NextResponse.json({ error: 'Artist not found' }, { status: 404 })
      }

      return NextResponse.json(
        { message: 'Artist deleted successfully' },
        { status: 200 }
      )
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting artist' }, { status: 500 })
    }
  })
)
