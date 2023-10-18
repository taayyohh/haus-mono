import { IMusicVideo } from '@/models/MusicVideo'
import config from '@/constants/config'

export async function fetchVideos(
  page = 1,
  limit = 10
): Promise<{ data: IMusicVideo[] }> {
  let response
  try {
    response = await fetch(`${config.BASE_URL}api/videos?page=${page}&limit=${limit}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
