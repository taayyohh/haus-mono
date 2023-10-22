import connectDb from '@/modules/auth/utils/db'
import Album, { IAlbum } from '@/models/Album'
import { NextRequest, NextResponse } from 'next/server'

export const POST = connectDb(async (req: NextRequest) => {
  const { ids } = await req.json()

  try {
    const albums: IAlbum[] = await Album.find({
      _id: { $in: ids },
    })
      .sort({ releaseDate: -1 }) // Sort by releaseDate in descending order
      .exec()

    return NextResponse.json(albums, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching albums by ids' }, { status: 500 })
  }
})
