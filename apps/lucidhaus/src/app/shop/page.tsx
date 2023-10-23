import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import Link from 'next/link'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { Metadata } from 'next'
import ProductCard from '@/modules/store/components/ProductCard'

export const metadata: Metadata = {
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
  const { data: products } = await fetchProducts(1, 10)

  return (
    <div>
      <div
        className={
          'uppercase text-white py-3 px-4 sm:px-8 border-solid border-t border-white-13'
        }
      >
        Shop
      </div>
      <div className={'bg-[#1b1b1b] h-[450px] w-full'}></div>
      <div className={'uppercase text-white py-3 px-4 sm:px-8'}>Latest Releases</div>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-solid border-t border-white-13'
        }
      >
        {products.length &&
          products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  )
}
