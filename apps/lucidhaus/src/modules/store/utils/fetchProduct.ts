import { IProduct } from '@/models/Product'
import config from '@/constants/config'

export async function fetchProduct(slug: string): Promise<{ data: IProduct }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/products/${slug}`)
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: {} as IProduct }
  }
}
