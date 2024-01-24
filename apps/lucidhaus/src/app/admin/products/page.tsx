import React from 'react'
import Link from 'next/link'
import { fetchArtists } from '@/modules/artists/utils/fetchArtists'
import { fetchProducts } from '@/modules/shop'

export default async function Page() {
  const { data: products } = await fetchProducts()

  console.log('PR', products)
  return (
    <div>
      <h2 className="text-right mb-8 border-b pb-2">Manage | Products</h2>
      <div className={'flex flex-col'}>
        <Link href={'/admin/products/create'}>Create</Link>
      </div>
      {products &&
        products.map((product) => (
          <div key={product._id}>
            <Link href={`/admin/products/${product.slug}`}>
              <div>{product.name}</div>
            </Link>
          </div>
        ))}
    </div>
  )
}
