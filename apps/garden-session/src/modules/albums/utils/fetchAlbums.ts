import { IAlbum } from '@/models/Album'
import config from '@/constants/config'

export async function fetchAlbums(page = 1, limit = 10): Promise<{ data: IAlbum[] }> {
  let response
  try {
    response = await fetch(`${config.BASE_URL}api/albums?page=${page}&limit=${limit}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
