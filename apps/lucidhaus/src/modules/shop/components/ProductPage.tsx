'use client'

import { IProduct } from '@/models/Product'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Stripe from 'stripe'
import useCartStore from '@/store/shop'
import { useResponsive } from '@/hooks/useResponsive'
import { CartSelector } from '@/modules/shop/components/CartSelector'

export type combinedProduct = {
  haus: IProduct
  stripe: Stripe.Product | undefined
}

const ProductPage = ({ product }: { product: combinedProduct }) => {
  const { isMobile } = useResponsive()
  const items = useCartStore((state) => state.items)
  const itemsInCart = items.filter((item) => item.haus.stripeId === product.haus.stripeId)

  return (
    <div className={'flex flex-col text-white w-full mx-auto items-center'}>
      <div
        className={'grid grid-cols-1 sm:grid-cols-2 w-full'}
        style={isMobile ? { height: '100%' } : { height: 'calc(100vh - 96px)' }}
      >
        <div className={'mb-6 sm:mb-0 relative flex h-full items-center justify-center'}>
          <Image
            src={getIpfsGateway(product.haus.imageUri[0] || '')}
            alt={`image for ${product.haus.name}`}
            width={700}
            height={700}
            style={{ objectFit: 'contain' }}
          />
        </div>

        <div
          className={
            'flex flex-col items-center h-full justify-center w-full sm:w-[300px] md:w-[380px] mx-auto px-4 sm:px-6'
          }
        >
          <div className={'text-2xl py-6 text-center'}>{product.haus.name}</div>
          <div className={'text-sm'}>{product.haus.description}</div>
          <div className="py-6 text-xl">{product.haus.price} USD</div>
          <CartSelector itemsInCart={itemsInCart} product={product} />
        </div>
      </div>
    </div>
  )
}

export default ProductPage
