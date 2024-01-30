import { IMusicVideo } from '@/models/MusicVideo'
import config from '@/constants/config'

export async function fetchVideo(slug: string): Promise<{ data: IMusicVideo }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/videos/${encodeURIComponent(slug)}`)
    const data = await response.json()
    return { data }
  } catch (err) {

    return { data: {} as IMusicVideo }
  }
}
