import { IProduct } from '@/models/Product'
import config from '@/constants/config'

export async function fetchProducts(page = 1, limit = 10): Promise<{ data: IProduct[] }> {
  let response
  try {
    response = await fetch(`${config.BASE_URL}api/products?page=${page}&limit=${limit}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
