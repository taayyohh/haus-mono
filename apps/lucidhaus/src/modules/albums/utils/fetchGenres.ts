import { IGenre } from '@/models/Genre'
import config from '@/constants/config'

export async function fetchGenres(page = 1, limit = 10): Promise<{ data: IGenre[] }> {
  let response
  try {
    response = await fetch(`${config.BASE_URL}api/genre?page=${page}&limit=${limit}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
