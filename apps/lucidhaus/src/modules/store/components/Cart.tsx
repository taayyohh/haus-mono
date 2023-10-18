'use client'
import useCartStore from '@/store/shop'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Image from 'next/image'
import Link from 'next/link'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const cartTotal = useCartStore((state) => state.cartTotal)
  const remove = useCartStore((state) => state.removeProduct)
  const increment = useCartStore((state) => state.incrementProductQuantity)
  const decrement = useCartStore((state) => state.decrementProductQuantity)

  return (
    <div className={'relative flex flex-col gap-4 w-full mx-auto'}>
      <div className={'flex flex-col'}>
        <div className={'text-xs uppercase font-bold'}>Total</div>
        <div className={'text-3xl'}>
          {cartTotal} <span className={'text-sm'}>USD</span>
        </div>
      </div>
      <div>
        <div
          className={
            'max-h-[50vh] overflow-hidden overflow-y-scroll flex flex-col w-full gap-4'
          }
        >
          {items &&
            items.map((product) => (
              <div
                className={'flex flex-col lg:flex-row relative border rounded p-4 gap-4'}
                key={product.haus.stripeId}
              >
                <Link href={`/shop/${product.haus.slug}`}>
                  <Image
                    src={getIpfsGateway(product.haus.imageUri || '')}
                    alt={`image for ${product.haus.name}`}
                    width={120}
                    height={120}
                    style={{ objectFit: 'contain' }}
                  />
                </Link>
                <div className={'flex flex-col py-4'}>
                  <div className={'text-2xl font-bold'}>{product.haus.name}</div>
                  <div className={'italic'}>{product.haus.description}</div>
                  <div className={'absolute right-6 bottom-3'}>
                    {product.haus.price} <span className={'text-xs'}>USD</span>
                  </div>
                  <div className={'flex flex-col absolute top-3 right-6'}>
                    <div className={'grid grid-cols-3'}>
                      <button onClick={() => increment(product.haus.stripeId)}>+</button>
                      <button>{product.quantity}</button>
                      <button onClick={() => decrement(product.haus.stripeId)}>-</button>
                    </div>
                    <button onClick={() => remove(product.haus.stripeId)}>remove</button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
