'use client'

import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import { ipfsUrl } from '@/lib/ipfs'
import { useCart } from '@/hooks/useCart'

interface ProductStock {
  id: string
  size: string
  quantity: number
}

interface ProductDetailProps {
  product: {
    id: string
    name: string
    slug: string
    description: string
    price: number
    images: string[]
    stock: ProductStock[]
    quantity: number
  }
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)
  const { addToCart } = useCart()

  const hasSizes = product.stock.length > 0
  const isSoldOut = hasSizes
    ? product.stock.every(s => s.quantity === 0)
    : product.quantity === 0
  const canAdd = hasSizes ? selectedSize !== null && !isSoldOut : !isSoldOut

  // Low stock warning
  const currentStock = hasSizes
    ? product.stock.find(s => s.size === selectedSize)?.quantity
    : product.quantity
  const showLowStock = currentStock !== undefined && currentStock > 0 && currentStock <= 10

  const handleAddToCart = () => {
    if (!canAdd) return

    addToCart({
      productId: product.id,
      quantity,
      price: product.price,
      size: selectedSize,
      productName: product.name,
      productImage: product.images[0] ? ipfsUrl(product.images[0]) : '',
    })

    toast.success(`${product.name} added to cart`)
    setQuantity(1)
  }

  return (
    <div className="px-4 sm:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Images */}
        <div>
          {/* Main image */}
          {product.images[activeImage] && (
            <div className="relative aspect-square border border-white-13 mb-4">
              {isSoldOut && (
                <div className="absolute inset-0 bg-black/60 z-10 flex items-center justify-center">
                  <span className="text-white text-lg uppercase tracking-widest">Sold Out</span>
                </div>
              )}
              <Image
                src={ipfsUrl(product.images[activeImage])}
                alt={product.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          )}
          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`relative aspect-square border overflow-hidden ${
                    activeImage === i ? 'border-white' : 'border-white-13 opacity-60 hover:opacity-100'
                  }`}
                >
                  <Image
                    src={ipfsUrl(image)}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="25vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <h1 className="text-2xl uppercase font-bold text-white">{product.name}</h1>
          <p className="text-white/60 text-xl mt-2">${product.price.toFixed(2)}</p>

          {showLowStock && (
            <p className="text-red-400 text-xs uppercase mt-2">
              Only {currentStock} left in stock
            </p>
          )}

          {hasSizes && (
            <div className="mt-6">
              <p className="text-xs uppercase text-white/40 mb-2">Size</p>
              <div className="flex gap-2">
                {product.stock.map((s) => (
                  <button
                    key={s.id}
                    disabled={s.quantity === 0}
                    onClick={() => setSelectedSize(s.size)}
                    className={`border px-4 py-2 text-sm text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                      selectedSize === s.size
                        ? 'border-white bg-white/10'
                        : 'border-white-13 hover:bg-white/5'
                    }`}
                  >
                    {s.size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity selector */}
          {!isSoldOut && (
            <div className="mt-6 flex items-center gap-4">
              <p className="text-xs uppercase text-white/40">Qty</p>
              <div className="flex items-center border border-white-13">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 text-white hover:bg-white/5 flex items-center justify-center"
                >
                  -
                </button>
                <span className="w-10 h-10 text-white text-sm flex items-center justify-center border-x border-white-13">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 text-white hover:bg-white/5 flex items-center justify-center"
                >
                  +
                </button>
              </div>
            </div>
          )}

          <button
            onClick={handleAddToCart}
            disabled={!canAdd || isSoldOut}
            className="mt-8 w-full bg-white text-black py-3 uppercase text-sm font-medium hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <ShoppingBagIcon />
            {isSoldOut ? 'Sold Out' : hasSizes && !selectedSize ? 'Select a Size' : 'Add to Cart'}
          </button>

          <div className="mt-8 text-white/80 leading-relaxed whitespace-pre-line">
            {product.description}
          </div>
        </div>
      </div>
    </div>
  )
}

function ShoppingBagIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M216,64H176a48,48,0,0,0-96,0H40A16,16,0,0,0,24,80V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V80A16,16,0,0,0,216,64ZM128,32a32,32,0,0,1,32,32H96A32,32,0,0,1,128,32Zm88,168H40V80H80V96a8,8,0,0,0,16,0V80h64V96a8,8,0,0,0,16,0V80h40Z" />
    </svg>
  )
}
