'use client'
import useCartStore from '@/store/shop'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Image from 'next/image'
import Link from 'next/link'
import CartCard from '@/modules/shop/components/CartCard'

export default function Cart() {
  const items = useCartStore((state) => state.items)
  const cartTotal = useCartStore((state) => state.cartTotal)

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
            items.map((cartItem) => (
              <CartCard key={cartItem.haus._id} cartItem={cartItem} controls={true} />
            ))}
        </div>
      </div>
    </div>
  )
}
