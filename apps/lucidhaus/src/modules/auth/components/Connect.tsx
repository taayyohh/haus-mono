'use client'

import React from 'react'
import { usePrivy } from '@privy-io/react-auth'
import Login from '../../../../public/icons/login.svg'

import Link from 'next/link'

const Connect = () => {
  const { login, ready, authenticated } = usePrivy()

  if (!authenticated || !ready) {
    return (
      <div className={'flex gap-2'}>
        <button
          onClick={login}
          className={`relative flex items-center justify-center focus:outline-none text-white cursor-pointer border px-4 py-2 w-full z-20 uppercase rounded`}
        >
          Connect
        </button>
      </div>
    )
  } else {
    return (
      <Link
        className={`relative flex items-center justify-center focus:outline-none text-white cursor-pointer border px-4 py-2 w-full z-20 rounded`}
        href={'/me'}
        style={{ boxShadow: '-2px 4px 3px 0px #000' }}
      >
        Me
        {/*<User width="12" style={{ fill: '#000' }} />*/}
      </Link>
    )
  }
}

export default Connect
