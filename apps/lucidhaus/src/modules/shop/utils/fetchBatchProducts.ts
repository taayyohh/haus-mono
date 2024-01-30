import { IAlbum } from '@/models/Album'
import config from '@/constants/config'
import { ObjectId } from 'mongoose'
import axios from 'axios'

export async function fetchBatchProducts(
  ids: Array<string | ObjectId>,
  page = 1,
  limit = 10
): Promise<{ data: IAlbum[] }> {
  try {
    const response = await axios.post(
      `${config.BASE_URL}api/products/batch?page=${page}&limit=${limit}`,
      { ids },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    return { data: response.data }
  } catch (error) {
    console.error('Error fetching data')
    return { data: [] }
  }
}
