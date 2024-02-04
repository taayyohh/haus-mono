import { fetchProducts } from '@/modules/shop/utils/fetchProducts'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { Metadata } from 'next'
import Products from '@/modules/shop/Products'
import config from '@/constants/config'

export const metadata: Metadata = {
  metadataBase: new URL(config.BASE_URL as string),
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    description: 'Timeless, post-genre, Black music.',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
        ),
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'LUCIDHAUS',
    card: 'summary_large_image',
    description: 'Timeless, post-genre, Black music.',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
    ),
  },
}
export default async function Page(context: any) {
  const { data: products } = await fetchProducts(1, 30)

  return <Products initialData={products} />
}
