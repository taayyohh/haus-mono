import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest, verifyToken } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import MusicVideo, { IMusicVideo } from '@/models/MusicVideo' // Importing the MusicVideo model

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const {
      title,
      releaseDate,
      song,
      primaryArtist,
      artists,
      videoUri,
      thumbnailUri,
      director,
      producers,
      cinematographers,
      choreographers,
      videoEditors,
      productionCompany,
      locations,
      cameoAppearances,
      collectionAddress,
      videoNotes,
    } = await req.json()

    try {
      const musicVideo = new MusicVideo({
        title,
        releaseDate,
        song,
        primaryArtist,
        artists,
        videoUri,
        thumbnailUri,
        director,
        producers,
        cinematographers,
        choreographers,
        videoEditors,
        productionCompany,
        locations,
        cameoAppearances,
        collectionAddress,
        videoNotes,
      })
      await musicVideo.save()
      return NextResponse.json(
        { message: 'Music video created successfully' },
        { status: 201 }
      )
    } catch (err) {
      console.log('err', err)
      return NextResponse.json({ error: 'Error creating music video' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const musicVideos: IMusicVideo[] = await MusicVideo.find({})
      .sort({ releaseDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
    return NextResponse.json(musicVideos, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching music videos' }, { status: 500 })
  }
})
