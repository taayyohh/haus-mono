import { IAlbum } from '@/models/Album'
import config from '@/constants/config'
import { ObjectId } from 'mongoose'
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

export async function fetchBatchAlbums(
  ids: Array<string | ObjectId>,
  page = 1,
  limit = 10
): Promise<{ data: IAlbum[] }> {
  try {
    const response = await fetch(
      `${config.BASE_URL}api/albums/batch?page=${page}&limit=${limit}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids }),
      }
    )
    const data = await response.json()

    if (!response.ok) {
      return { data: [] }
    } else {
      return { data }
    }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
