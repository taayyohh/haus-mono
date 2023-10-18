import { IAlbum } from '@/models/Album'
import config from '@/constants/config'

export async function fetchAlbum(slug: string): Promise<{ data: IAlbum }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/albums/${slug}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: {} as IAlbum }
  }
}
