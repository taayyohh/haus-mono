import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import Genre from '@/models/Genre'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'

export const GET = connectDb(async (req: AuthenticatedRequest) => {
  const slug = req.nextUrl.pathname.split('/')[3]

  try {
    const genre = await Genre.findOne({ slug })

    if (!genre) {
      return NextResponse.json({ error: 'Genre not found' }, { status: 404 })
    }
    return NextResponse.json(genre, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching genre' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const genreId = req.nextUrl.searchParams.get('id')
    const { name, description } = await req.json() // Assuming you want to update the name and description

    try {
      const genre = await Genre.findByIdAndUpdate(
        genreId,
        { name, description },
        { new: true }
      )

      if (!genre) {
        return NextResponse.json({ error: 'Genre not found' }, { status: 404 })
      }

      return NextResponse.json(genre, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating genre' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const genreId = req.nextUrl.searchParams.get('id')

    try {
      const genre = await Genre.findByIdAndDelete(genreId)

      if (!genre) {
        return NextResponse.json({ error: 'Genre not found' }, { status: 404 })
      }

      return NextResponse.json({ message: 'Genre deleted successfully' }, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting genre' }, { status: 500 })
    }
  })
)
