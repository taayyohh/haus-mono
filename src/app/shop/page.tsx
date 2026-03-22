import { prisma } from '@/lib/prisma'
import { ipfsUrl } from '@/lib/ipfs'
import Link from 'next/link'
import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop',
}

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true, isArchived: false },
    include: { stock: true },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div className="px-4 sm:px-8">
      <h1 className="text-2xl uppercase tracking-widest text-white/40 py-8">Shop</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 border-t border-white-13 pt-8">
        {products.map((product) => {
          const isSoldOut = product.stock.length > 0
            ? product.stock.every(s => s.quantity === 0)
            : product.quantity === 0

          return (
            <Link
              key={product.id}
              href={`/shop/${product.slug}`}
              className="border border-white-13 overflow-hidden group"
            >
              {product.images[0] && (
                <div className="relative aspect-square">
                  {isSoldOut && (
                    <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                      <span className="text-white text-sm uppercase tracking-widest">Sold Out</span>
                    </div>
                  )}
                  <Image
                    src={ipfsUrl(product.images[0])}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              )}
              <div className="p-4">
                <h2 className="text-white text-sm uppercase">{product.name}</h2>
                <p className="text-white/40 text-xs mt-1">${product.price.toFixed(2)}</p>
              </div>
            </Link>
          )
        })}
        {products.length === 0 && (
          <p className="text-white/40 text-sm col-span-full py-12 text-center">
            No products yet. Check back soon.
          </p>
        )}
      </div>
    </div>
  )
}
