import { IArtist } from '@/models/Artist'
import config from '@/constants/config'
import { ObjectId } from 'mongoose'

export async function fetchArtist(
  slugOrId: string | ObjectId
): Promise<{ data: IArtist }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/artists/${slugOrId}`)
    const data = await response.json()
    return { data }
  } catch (err) {

    return { data: {} as IArtist }
  }
}
