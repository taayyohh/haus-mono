import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import Album from '@/models/Album'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'

export const GET = connectDb(async (req: AuthenticatedRequest) => {
  const slug = req.nextUrl.pathname.split('/')[3]

  try {
    const album = await Album.findOne({ slug })
    if (!album) {
      return NextResponse.json({ error: 'Album not found' }, { status: 404 })
    }
    return NextResponse.json(album, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching album' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const albumId = req.nextUrl.searchParams.get('id')
    const { title } = await req.json() // Assuming you want to update the title, adjust as needed

    try {
      const album = await Album.findByIdAndUpdate(albumId, { title }, { new: true })

      if (!album) {
        return NextResponse.json({ error: 'Album not found' }, { status: 404 })
      }

      return NextResponse.json(album, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating album' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const albumId = req.nextUrl.searchParams.get('id')

    try {
      const album = await Album.findByIdAndDelete(albumId)

      if (!album) {
        return NextResponse.json({ error: 'Album not found' }, { status: 404 })
      }

      return NextResponse.json({ message: 'Album deleted successfully' }, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting album' }, { status: 500 })
    }
  })
)
