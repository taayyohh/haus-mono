import Link from 'next/link'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { CartItem } from '@/store/shop'
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
      <div
        className={
          'inline-flex min-w-[70px] :min-h-[70px] sm:min-w-[120px] sm:min-h-[120px]'
        }
      >
        <Link href={`/shop/${cartItem.haus.slug}`} className="flex">
          <Image
            src={getIpfsGateway(cartItem.haus.imageUri[0] || '')}
            alt={`image for ${cartItem.haus.name}`}
            width={120}
            height={120}
            style={{ objectFit: 'contain' }}
          />
        </Link>
      </div>

      <div className={'flex flex-col gap-1 py-4'}>
        <div className={'text-lg sm:text-2xl font-bold'}>{cartItem.haus.name}</div>
        <div
          className={'text-xs sm:text-md italic max-w-[85%] opacity-80'}
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
        </div>
        <div className={'flex gap-1 text-xs opacity-80 font-bold'}>
          {cartItem.size && <div>{cartItem.size}</div>}
          <div>({cartItem.quantity})</div>
        </div>

        <div className={'absolute right-4 sm:right-6 bottom-1 sm:bottom-3'}>
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
