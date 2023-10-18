import { IGenre } from '@/models/Genre'
import config from '@/constants/config'

export async function fetchGenre(slug: string): Promise<{ data: IGenre }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/genre/${slug}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: {} as IGenre }
  }
}
