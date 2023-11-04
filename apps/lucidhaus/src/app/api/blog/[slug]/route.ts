import connectDb from '@/modules/auth/utils/db'
import { AuthenticatedRequest } from '@/modules/auth/utils/verifyToken'
import { NextResponse } from 'next/server'
import protect from '@/modules/auth/utils/protect'
import { isMongoObjectId } from '@/app/api/artists/[slug]/route'
import mongoose from 'mongoose'
import BlogPost from '@/models/Blog'
const ObjectId = mongoose.Types.ObjectId

export const GET = connectDb(async (req: AuthenticatedRequest) => {
  const slug = req.nextUrl.pathname.split('/')[3]

  try {
    const blogPost = await BlogPost.findOne({ slug })
    if (!blogPost) {
      return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
    }
    return NextResponse.json(blogPost, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error fetching blog post' }, { status: 500 })
  }
})

export const PUT = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const identifier = req.nextUrl.pathname.split('/')[3]

    let query
    if (isMongoObjectId(identifier)) {
      query = { _id: new ObjectId(identifier) }
    } else {
      query = { slug: identifier }
    }

    const { title, content } = await req.json() // Assuming you want to update the title and content, adjust as needed

    try {
      const blogPost = await BlogPost.findOneAndUpdate(
        query,
        { title, content },
        { new: true }
      )

      if (!blogPost) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
      }

      return NextResponse.json(blogPost, { status: 200 })
    } catch (err) {
      return NextResponse.json({ error: 'Error updating blog post' }, { status: 500 })
    }
  })
)

export const DELETE = connectDb(
  protect(async (req: AuthenticatedRequest) => {
    const blogPostId = req.nextUrl.searchParams.get('id')

    try {
      const blogPost = await BlogPost.findByIdAndDelete(blogPostId)

      if (!blogPost) {
        return NextResponse.json({ error: 'Blog post not found' }, { status: 404 })
      }

      return NextResponse.json(
        { message: 'Blog post deleted successfully' },
        { status: 200 }
      )
    } catch (err) {
      return NextResponse.json({ error: 'Error deleting blog post' }, { status: 500 })
    }
  })
)
