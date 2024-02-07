import React from 'react'
import Link from 'next/link'
import { fetchProducts } from '@/modules/shop'
import ProductCard from '@/modules/shop/components/ProductCard'

export default async function Page() {
  const { data: products } = await fetchProducts()

  return (
    <div>
      <h2 className="text-right mb-8 border-b pb-2">Manage | Products</h2>
      <div className={'flex flex-col'}>
        <Link
          href={'/admin/products/create'}
          className={
            'inline-flex self-start border border-white-13 py-4 px-8 text-2xl rounded'
          }
        >
          Create
        </Link>
      </div>
      <div className="grid grid-cols-4">
        {products &&
          products.map((product) => (
            <ProductCard
              key={product._id}
              url={`/admin/products/${product.slug}`}
              product={product}
            />
          ))}
      </div>
    </div>
  )
}
