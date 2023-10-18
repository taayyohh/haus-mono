import { IArtist } from '@/models/Artist'
import config from '@/constants/config'

export async function fetchArtists(page = 1, limit = 10): Promise<{ data: IArtist[] }> {
  let response
  try {
    response = await fetch(`${config.BASE_URL}api/artists?page=${page}&limit=${limit}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
