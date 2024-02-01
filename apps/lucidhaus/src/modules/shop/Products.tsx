'use client'

import useSWR from 'swr'
import ProductCard from '@/modules/shop/components/ProductCard'
import { IProduct } from '@/models/Product'
import { random } from '@/utils'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Products({ initialData }: { initialData: IProduct[] }) {
  const { data: products, error } = useSWR<IProduct[]>('/api/products', fetcher, {
    fallbackData: initialData,
  })

  if (error) return <div>Failed to load products.</div>
  if (!products) return <div>Loading...</div>

  const randomProduct = random(products)

  return (
    <div>
      <div
        className={
          'uppercase text-white py-3 px-4 sm:px-8 border-solid border-t border-white-13'
        }
      >
        Shop
      </div>
      <div className={'bg-[#1b1b1b] h-[450px] w-full'}>
        <ProductCard
          key={products[randomProduct]._id}
          product={products[randomProduct]}
          featured
        />
      </div>
      <div className={'uppercase text-white py-3 px-4 sm:px-8'}>Latest Releases</div>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-solid border-t border-white-13'
        }
      >
        {products.length > 0 &&
          products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>
    </div>
  )
}
