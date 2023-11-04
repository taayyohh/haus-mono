import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest, verifyToken } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import BlogPost, { IBlogPost } from '@/models/Blog'

export const POST = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const {
      title,
      publishedDate,
      description,
      primaryArtist,
      thumbnailUri,
      tags,
      collectionAddress,
    } = await req.json()

    try {
      const post = new BlogPost({
        title,
        publishedDate,
        description,
        primaryArtist,
        thumbnailUri,
        tags,
        collectionAddress,
      })
      await post.save()
      return NextResponse.json(
        { message: 'Blog post created successfully' },
        { status: 201 }
      )
    } catch (err) {
      console.log('err', err)
      return NextResponse.json({ error: 'Error creating blog post' }, { status: 500 })
    }
  })
)

export const GET = connectDb(async (req) => {
  const page = parseInt(req.nextUrl.searchParams.get('page') as string) || 1
  const limit = parseInt(req.nextUrl.searchParams.get('limit') as string) || 10
  const skip = (page - 1) * limit

  try {
    const posts: IBlogPost[] = await BlogPost.find({})
      .sort({ publishedDate: -1 })
      .skip(skip)
      .limit(limit)
      .exec()
    return NextResponse.json(posts, { status: 200 })
  } catch (err) {
    return NextResponse.json({ error: 'Error fetching blog posts' }, { status: 500 })
  }
})
