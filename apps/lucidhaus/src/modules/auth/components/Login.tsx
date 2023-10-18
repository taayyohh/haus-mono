'use client'

import React, { useCallback } from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { useRouter } from 'next/navigation'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
const Login = () => {
  const { login, logout, ready, authenticated, user } = usePrivy()
  const { wallet } = usePrivyWagmi()
  const router = useRouter()

  const handleLogout = useCallback(async () => {
    wallet?.disconnect()
    await fetch('/api/auth/logout', { method: 'POST' })
    await logout()
    router.push('/')
  }, [logout, router, wallet])

  if (authenticated && ready) {
    return (
      <div className={'mt-12 flex flex-col gap-2'}>
        <button
          onClick={handleLogout}
          className={
            'flex w-full self-start items-center justify-center rounded py-3 px-6 bg-white text-black border'
          }
        >
          Disconnect
        </button>
      </div>
    )
  } else {
    return (
      <div className={'my-4'}>
        <button
          onClick={login}
          className={
            'flex w-full self-start items-center justify-center rounded py-3 px-6 bg-white text-black border'
          }
        >
          login
        </button>
      </div>
    )
  }
}

export default Login
