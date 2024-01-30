'use client'

import useCartStore from '@/store/shop'
import Link from 'next/link'
import { ShoppingCart } from '@phosphor-icons/react'

export default function Cart() {
  const totalItems = useCartStore((state) => state.totalItems)

  if (!totalItems) return null

  return (
    <Link
      className={`border-solid border-t border-white-13 mt-4 py-1 pt-4 relative flex gap-2 items-center justify-center focus:outline-none text-white cursor-pointer z-20`}
      href={'/checkout'}
    >
      <ShoppingCart size={24} />
      <span className={'text-xs'}>({totalItems})</span>
    </Link>
  )
}
