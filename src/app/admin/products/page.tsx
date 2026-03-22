'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Product {
  id: string
  name: string
  slug: string
  price: number
  images: string[]
  category: string
  quantity: number
  isActive: boolean
  isArchived: boolean
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [showArchived, setShowArchived] = useState(false)

  useEffect(() => {
    fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({
        query: `{ products { id name slug price images category quantity isActive isArchived } }`,
      }),
    })
      .then(r => r.json())
      .then(({ data }) => setProducts(data?.products || []))
  }, [])

  const filtered = products.filter(p => showArchived ? p.isArchived : !p.isArchived)

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl uppercase text-white">Products</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setShowArchived(!showArchived)}
            className="text-xs uppercase text-white/40 hover:text-white"
          >
            {showArchived ? 'Show Active' : 'Show Archived'}
          </button>
          <Link
            href="/admin/products/new"
            className="bg-white text-black px-4 py-2 text-sm uppercase hover:bg-gray-200"
          >
            New Product
          </Link>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((product) => (
          <Link
            key={product.id}
            href={`/admin/products/${product.id}`}
            className="flex items-center gap-4 border border-white-13 p-4 hover:bg-white/5"
          >
            {product.images[0] && (
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
              </div>
            )}
            <div className="flex-1">
              <div className="text-white text-sm uppercase">{product.name}</div>
              <div className="text-white/40 text-xs">{product.category}</div>
            </div>
            <div className="text-white/60 text-sm">${product.price.toFixed(2)}</div>
            <div className={`text-xs uppercase ${product.isActive ? 'text-green-400' : 'text-red-400'}`}>
              {product.isActive ? 'Active' : 'Inactive'}
            </div>
          </Link>
        ))}
        {filtered.length === 0 && (
          <p className="text-white/40 text-sm py-8 text-center">No products found.</p>
        )}
      </div>
    </div>
  )
}
