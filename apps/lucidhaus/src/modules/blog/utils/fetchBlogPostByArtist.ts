import axios from 'axios'
import config from '@/constants/config'
import { ObjectId } from 'mongoose'
import { IBlogPost } from '@/models/Blog'

export async function fetchBlogsByArtist(
  artistId: string | ObjectId,
  page: number = 1, // default page number
  limit: number = 10 // default limit
): Promise<{ data: IBlogPost[] }> {
  try {
    const response = await axios.post(`${config.BASE_URL}api/blog/artist`, {
      primaryArtistId: artistId,
      page,
      limit,
    })

    return {
      data: response.data,
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.error(`Error: ${err.message}`)
    } else {
      // Handle unknown errors
      console.error(`Error: ${err}`)
    }
    return { data: [] as IBlogPost[] }
  }
}
