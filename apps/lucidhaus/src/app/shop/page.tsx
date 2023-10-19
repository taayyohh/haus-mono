import { fetchProducts } from '@/modules/store/utils/fetchProducts'
import Link from 'next/link'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
        ),
        width: 800,
        height: 600,
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
      <div className={'text-4xl uppercase text-white py-3 px-4 sm:px-8 border-solid border-t'}>Shop</div>
      <div className={'bg-white h-[450px] w-full'}></div>
      <div className={'text-4xl uppercase text-white py-3 px-4 sm:px-8'}>Latest Releases</div>
      <div className={'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4'}>
        {products.length &&
          products.map((product) => (
            <Link
              href={`/shop/${product.slug}`}
              key={product._id}
              className={'flex flex-col p-8 border border-l-0 h-full'}
            >
              <div className={'relative flex h-full w-full'}>
                <Image
                  src={getIpfsGateway(product.imageUri)}
                  alt={`Product image of ${product.name}`}
                  height={400}
                  width={400}
                  style={{
                    objectFit: 'contain',
                    width: '100%',
                  }}
                />
              </div>
              <div className={'flex flex-col mt-4'}>
                <div>{product.name}</div>
                <div className={'text-sm'}>{product.price} USD</div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  )
}
