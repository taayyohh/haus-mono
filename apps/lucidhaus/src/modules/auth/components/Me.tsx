'use client'

import React from 'react'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { useBalance, useNetwork } from 'wagmi'
import { Address } from 'viem'
import Link from 'next/link'
import Login from '@/modules/auth/components/Login'
import { loadStripeOnramp } from '@stripe/crypto'
import config from '@/constants/config'
import Zorb from '../../../../public/icons/zorb.svg'
import { OnrampSessionResult } from '@stripe/crypto/types/api/onramp'
import { useResponsive } from '@/hooks/useResponsive'
import { shortenAddress } from '@/utils/shortenAddress'
import Onramp from '@/modules/auth/components/Onramp'

const Me = ({ onramp }: { onramp?: OnrampSessionResult }) => {
  const { login, logout, ready, authenticated, user } = usePrivy()
  const { wallets } = useWallets()
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi()
  const { data: balance } = useBalance({
    address: activeWallet?.address as Address,
  })
  const { chain, chains } = useNetwork()
  const stripeOnrampPromise = loadStripeOnramp(config.stripePublic!)
  const { isMobile } = useResponsive()

  if (!ready || !authenticated) return null

  return (
    <div className={'flex flex-col'}>
      {activeWallet && (
        <div className={'flex flex-col py-2'}>
          <label className={'text-xs font-bold uppercase'}>Wallet</label>
          <div>
            {isMobile ? shortenAddress(activeWallet?.address) : activeWallet?.address}
          </div>
        </div>
      )}
      {balance && (
        <div className={'flex flex-col py-2'}>
          <label className={'text-xs font-bold uppercase'}>Balance</label>
          <div>{balance.formatted} ETH</div>
        </div>
      )}
      {chain && (
        <div className={'flex flex-col py-2'}>
          <label className={'text-xs font-bold uppercase'}>Network</label>

          <div className={'flex items py-2'}>
            <Link href={'https://zora.energy/'}>
              <div className={'flex w-5 h-5'}>
                <Zorb />
              </div>
            </Link>
          </div>
        </div>
      )}
      {(onramp && stripeOnrampPromise && (
        <>
          <label className={'text-xs font-bold uppercase'}>Fund Wallet</label>
          <Onramp onramp={onramp} stripePromise={stripeOnrampPromise} />
        </>
      )) || (
        <div className={'flex flex-col py-2'}>
          <label className={'text-xs font-bold uppercase'}>Fund Wallet</label>
          <Link href={'/me/onramp'}>
            <button
              className={
                'border border-white-13 bg-[#1b1b1b] hover:bg-[#111] px-2 py-3 w-full mt-2'
              }
            >
              Buy ETH{' '}
            </button>
          </Link>
        </div>
      )}
      <Login />
    </div>
  )
}

export default Me
