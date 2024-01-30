import { IAlbum } from '@/models/Album'
import config from '@/constants/config'

export async function fetchAlbum(slugOrId: string): Promise<{ data: IAlbum }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/albums/${slugOrId}`)
    const data = await response.json()
    return { data }
  } catch (err) {

    return { data: {} as IAlbum }
  }
}
