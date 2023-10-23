'use client'

import useCartStore from '@/store/shop'
import Link from 'next/link'
import CartIcon from '../../../public/icons/cart.svg'

export default function Cart() {
  const totalItems = useCartStore((state) => state.totalItems)

  if (!totalItems) return null

  return (
    <Link
      className={`border-solid border-t border-white-13 mt-4 py-2 relative flex gap-1 items-center justify-center focus:outline-none text-white cursor-pointer z-20`}
      href={'/checkout'}
    >
      Cart
      <span className={'text-sm'}>({totalItems})</span>
    </Link>
  )
}
