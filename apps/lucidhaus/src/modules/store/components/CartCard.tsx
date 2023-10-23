import Link from 'next/link'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { CartItem } from '@/store/shop'

export default function CartCard({
  product,
  options,
}: {
  product: CartItem
  options?: {
    increment: (id: string) => void
    decrement: (id: string) => void
    remove: (id: string) => void
  }
}) {
  return (
    <div
      className={
        'flex flex-col lg:flex-row relative border border-white-13 rounded p-4 gap-4'
      }
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
        {options && (
          <div className={'flex flex-col absolute top-3 right-6'}>
            <div className={'grid grid-cols-3'}>
              <button onClick={() => options?.increment(product.haus.stripeId)}>+</button>
              <button>{product.quantity}</button>
              <button onClick={() => options?.decrement(product.haus.stripeId)}>-</button>
            </div>
            <button onClick={() => options.remove(product.haus.stripeId)}>remove</button>
          </div>
        )}
      </div>
    </div>
  )
}
