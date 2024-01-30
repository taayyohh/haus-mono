import Link from 'next/link'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import useCartStore, { CartItem } from '@/store/shop'
import { useCallback } from 'react'
import { CartQuantitySelector } from '@/modules/shop/components/CartQuantitySelector'

export default function CartCard({
  cartItem,
  controls,
}: {
  cartItem: CartItem
  controls?: boolean
}) {
  return (
    <div
      className={
        'flex items-center flex-row relative border border-white-13 rounded p-4 gap-4'
      }
      key={cartItem.haus.stripeId}
    >
      <div className={'min-w-[120px] min-h-[120px]'}>
        <Link href={`/shop/${cartItem.haus.slug}`}>
          <Image
            src={getIpfsGateway(cartItem.haus.imageUri[0] || '')}
            alt={`image for ${cartItem.haus.name}`}
            width={120}
            height={120}
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>

      <div className={'flex flex-col py-4'}>
        <div className={'text-2xl font-bold'}>{cartItem.haus.name}</div>
        <div
          className={'italic max-w-[85%]'}
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '1.2em',
            maxHeight: '2.4em',
          }}
        >
          {cartItem.haus.description}
        </div>{' '}
        <div className={'absolute right-6 bottom-3'}>
          {cartItem.haus.price} <span className={'text-xs'}>USD</span>
        </div>
        {controls && (
          <div className={'flex flex-col absolute top-3 right-6'}>
            <CartQuantitySelector cartItem={cartItem} />
          </div>
        )}
      </div>
    </div>
  )
}
