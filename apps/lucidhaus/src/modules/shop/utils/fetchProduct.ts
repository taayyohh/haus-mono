import { IProduct } from '@/models/Product'
import config from '@/constants/config'

export async function fetchProduct(slug: string): Promise<{ data: IProduct & { slug: string } }> {
  try {
    const response = await fetch(`${config.BASE_URL}api/products/${slug}`)
    const data = await response.json()
    return { data }
  } catch (err) {

    return { data: {} as IProduct & { slug: string } }
  }
}
