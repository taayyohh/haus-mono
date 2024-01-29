import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import Artist, { IArtist } from '@/models/Artist' // Updated this import

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const { name, bio, genre, albums, heroImage, socialLinks, ethereum } =
      await req.json()

    try {
      const artist = new Artist({
        name,
        bio,
        genre,
        albums,
        heroImage,
        socialLinks,
        ethereum,
      })
      await artist.save()
      return NextResponse.json(
        { message: 'Artist created successfully' },
        { status: 201 }
      )
    } catch (err) {
      console.log('err', err)
      return NextResponse.json({ error: 'Error creating artist' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const artists: IArtist[] = await Artist.find({})
      .collation({ locale: 'en', strength: 2 })
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit)
      .exec() // Updated this line
    return NextResponse.json(artists, { status: 200 }) // Updated this line
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching artists' }, { status: 500 }) // Updated this line
  }
})
