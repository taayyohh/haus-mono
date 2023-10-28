'use client'

import React, { useEffect, useState } from 'react'
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
import { Modal } from '@/components/Modal'
import Bridge from '@/modules/auth/components/Bridge'
import { ZORA_CHAIN_ID } from '@/constants'
import Haus from '../../../../public/icons/haus-alt.svg'
import { useRouter } from 'next/navigation'

const Me = ({ onramp }: { onramp?: OnrampSessionResult }) => {
  const router = useRouter()
  const { login, logout, ready, authenticated, user } = usePrivy()
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi()
  const { data: balance } = useBalance({
    address: activeWallet?.address as Address,
    chainId: ZORA_CHAIN_ID,
  })
  const { chain, chains } = useNetwork()
  const stripeOnrampPromise = loadStripeOnramp(config.stripePublic!)
  const { isMobile } = useResponsive()

  const { wallet } = usePrivyWagmi()

  const [copySuccess, setCopySuccess] = useState(false)

  const handleAddressClick = () => {
    navigator.clipboard.writeText(activeWallet?.address || '').then(() => {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 1500)
    })
  }

  useEffect(() => {
    if (!ready || !authenticated) router.push('/')
  }, [ready, authenticated])

  if (!ready || !authenticated) return null

  return (
    <div className={'flex flex-col'}>
      <div className={'flex w-full items-center justify-center mb-8'}>
        <div className={'w-12 h-12'}>
          <Haus />
        </div>
      </div>

      {activeWallet && (
        <div className={'flex flex-col py-2'}>
          <label className={'text-xs font-bold uppercase'}>Wallet</label>
          <div
            onClick={handleAddressClick}
            style={{ cursor: 'pointer' }}
            className={'flex items-center'}
          >
            {isMobile ? shortenAddress(activeWallet?.address) : activeWallet?.address}
            {copySuccess && (
              <span className="ml-2 text-white-500 opacity-70 text-xs">copied!</span>
            )}
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
      {onramp && stripeOnrampPromise && (
        <div className={'flex flex-col'}>
          <div className={'uppercase text-sm border-t pt-2 mt-8 mb-4 border-white-13'}>
            Getting Started
          </div>
          <Modal
            trigger={
              <label
                className={
                  'text-xs font-bold uppercase mb-2 cursor-pointer hover:opacity-70'
                }
              >
                1. Fund Wallet with ETH
              </label>
            }
          >
            <div className={'flex flex-col w-full sm:w-[500px] pt-'}>
              <Onramp onramp={onramp} stripePromise={stripeOnrampPromise} />
            </div>
          </Modal>

          <div className={'flex flex-col mt-2'}>
            {chain?.id === 1 ? (
              <Modal
                trigger={
                  <label
                    className={
                      'text-xs font-bold uppercase mb-2 cursor-pointer hover:opacity-70'
                    }
                  >
                    2. Bridge ETH to Zora
                  </label>
                }
              >
                <Bridge />
              </Modal>
            ) : (
              <div>
                <label
                  className={
                    'text-xs font-bold uppercase mb-2 cursor-pointer hover:opacity-70'
                  }
                  onClick={!!user ? () => wallet?.switchChain(1) : () => login()}
                >
                  2. Bridge ETH to Zora
                </label>
              </div>
            )}
          </div>
          <div className={'flex flex-col mt-4'}>
            <label
              className={
                'text-xs font-bold uppercase mb-2 cursor-pointer hover:opacity-70'
              }
            >
              <Link href={'/discography'}>3. Explore and Mint</Link>
            </label>
          </div>
        </div>
      )}
      <Login />
    </div>
  )
}

export default Me
