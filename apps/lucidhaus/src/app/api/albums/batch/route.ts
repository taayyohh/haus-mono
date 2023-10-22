import connectDb from '@/modules/auth/utils/db'
import Album, { IAlbum } from '@/models/Album'
import { NextResponse } from 'next/server'

export const POST = connectDb(async (req) => {
  const body = await req.json()

  // If ids are provided in the request body
  if (body.ids && Array.isArray(body.ids)) {
    try {
      const albums: IAlbum[] = await Album.find({
        _id: { $in: body.ids },
      })
        .sort({ releaseDate: -1 }) // Sort by releaseDate in descending order
        .exec()

      return NextResponse.json(albums, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error fetching albums by ids' }, { status: 500 })
    }
  } else {
    return NextResponse.json({ error: 'No album ids provided' }, { status: 400 })
  }
})
