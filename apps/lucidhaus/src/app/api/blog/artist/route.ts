import connectDb from '@/modules/auth/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import BlogPost, { IBlogPost } from '@/models/Blog'
import mongoose from 'mongoose'

export const POST = connectDb(async (req: NextRequest) => {
  const { primaryArtistId, page = 1, limit = 10 } = await req.json() // Default to page 1, limit 10

  try {
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(primaryArtistId)) {
      return NextResponse.json({ error: 'Invalid artist ID' }, { status: 400 })
    }

    // Convert page and limit to integers and calculate the skip value
    const pageNum = parseInt(page, 10)
    const limitNum = parseInt(limit, 10)
    const skip = (pageNum - 1) * limitNum

    const blogPosts: IBlogPost[] = await BlogPost.find({ primaryArtist: primaryArtistId })
      .sort({ publishedDate: -1 }) // Sort by publishedDate in descending order
      .skip(skip) // Skip the results for previous pages
      .limit(limitNum) // Limit the number of results
      .exec()

    // If no blog posts are found for the artist, you may want to return a 404 or an empty array
    if (!blogPosts.length) {
      return NextResponse.json(
        { message: 'No blog posts found for the specified artist' },
        { status: 404 }
      )
    }

    return NextResponse.json(blogPosts, { status: 200 })
  } catch (err) {
    // Log the error for server-side debugging
    console.error('Error fetching blog posts by primaryArtist', err)
    return NextResponse.json(
      { error: 'Error fetching blog posts by primaryArtist' },
      { status: 500 }
    )
  }
})
