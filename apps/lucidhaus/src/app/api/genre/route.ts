import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import Genre, { IGenre } from '@/models/Genre'

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const { name, description } = await req.json()

    try {
      const genre = new Genre({
        name,
        description,
      })
      await genre.save()
      return NextResponse.json({ message: 'Genre created successfully' }, { status: 201 })
    } catch (err) {

      return NextResponse.json({ error: 'Error creating genre' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const genres: IGenre[] = await Genre.find({}).skip(skip).limit(limit).exec()
    return NextResponse.json(genres, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching genres' }, { status: 500 })
  }
})
