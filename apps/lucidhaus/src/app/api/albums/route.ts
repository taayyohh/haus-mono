import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import Album, { IAlbum } from '@/models/Album' // Importing the Album model

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const {
      title,
      releaseDate,
      genre,
      coverImageUri,
      tracks,
      primaryArtist,
      artists,
      collectionAddress,
      label,
      producers,
      mixers,
      masteringEngineers,
      recordingEngineers,
      studios,
      additionalMusicians,
      albumNotes,
      catalogNumber,
    } = await req.json()

    try {
      const album = new Album({
        title,
        releaseDate,
        genre,
        coverImageUri,
        tracks,
        primaryArtist,
        artists,
        collectionAddress,
        label,
        producers,
        mixers,
        masteringEngineers,
        recordingEngineers,
        studios,
        additionalMusicians,
        albumNotes,
        catalogNumber,
      })
      await album.save()
      return NextResponse.json({ message: 'Album created successfully' }, { status: 201 })
    } catch (err) {
      return NextResponse.json({ error: 'Error creating album' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const albums: IAlbum[] = await Album.find({})
      .sort({ releaseDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
    return NextResponse.json(albums, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching albums' }, { status: 500 })
  }
})
