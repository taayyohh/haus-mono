import config from '@/constants/config'
import { ObjectId } from 'mongoose'
import { IBlogPost } from '@/models/Blog'

export async function fetchBlogsByArtist(
  artistId: string | ObjectId,
  page: number = 1, // default page number
  limit: number = 10 // default limit
): Promise<{ data: IBlogPost[] }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/blog/artist`, {
      // This endpoint should match your actual endpoint
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ primaryArtistId: artistId, page, limit }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return {
      data,
    }
  } catch (err) {
    return { data: [] as IBlogPost[] }
  }
}
