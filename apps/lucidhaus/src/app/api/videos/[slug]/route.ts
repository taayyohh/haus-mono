import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import MusicVideo from '@/models/MusicVideo'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'

export const GET = connectDb(async (req: AuthenticatedRequest) => {
  const slug = req.nextUrl.pathname.split('/')[3]

  try {
    const musicVideo = await MusicVideo.findOne({ slug })
    if (!musicVideo) {
      return NextResponse.json({ error: 'Music video not found' }, { status: 404 })
    }
    return NextResponse.json(musicVideo, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching music video' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const musicVideoId = req.nextUrl.searchParams.get('id')
    const { title } = await req.json() // Assuming you want to update the title, adjust as needed

    try {
      const musicVideo = await MusicVideo.findByIdAndUpdate(
        musicVideoId,
        { title },
        { new: true }
      )

      if (!musicVideo) {
        return NextResponse.json({ error: 'Music video not found' }, { status: 404 })
      }

      return NextResponse.json(musicVideo, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating music video' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const musicVideoId = req.nextUrl.searchParams.get('id')

    try {
      const musicVideo = await MusicVideo.findByIdAndDelete(musicVideoId)

      if (!musicVideo) {
        return NextResponse.json({ error: 'Music video not found' }, { status: 404 })
      }

      return NextResponse.json(
        { message: 'Music video deleted successfully' },
        { status: 200 }
      )
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting music video' }, { status: 500 })
    }
  })
)
