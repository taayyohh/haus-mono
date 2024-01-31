import Connect from '@/modules/auth/components/Connect'
import Link from 'next/link'
import Cart from '@/components/navigation/Cart'
import { PopOut } from '@/components/PopOut'
import Haus from '../../../public/icons/haus-alt-2.svg'
import React from 'react'

const Navigation = () => {
  return (
    <div className={'flex justify-center items-center gap-2 z-10'}>
      <PopOut trigger={<Haus width={'100%'} height={'100%'} />}>
        <div className={'flex flex-col gap-2 text-white uppercase text-sm'}>
          <Connect />
          <Link href={'/artists'}>Artists</Link>
          <Link href={'/discography'}>Discography</Link>
          <Link href={'/videos'}>Videos</Link>
          <Link href={'/shop'}>Shop</Link>
        </div>
        <Cart />
      </PopOut>
    </div>
  )
}

export default Navigation
