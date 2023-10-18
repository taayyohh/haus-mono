'use client'

import { usePrivy } from '@privy-io/react-auth'
import { useContractWrite, useNetwork, usePrepareContractWrite } from 'wagmi'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { getZora1155PrepareConfig } from '@/utils/getZora1155PrepareConfig'
import Zorb from '../../public/icons/zorb.svg'
import { useCallback } from 'react'
import { ZORA_CHAIN_ID } from '@/constants'
import { Modal } from '@/components/Modal'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { shortenAddress } from '@/utils/shortenAddress'
import { formatEther } from 'viem'

const MintButton = ({
  collection,
  token,
  type,
  comment,
}: {
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
  collection: ZoraCreateContractQuery['zoraCreateContract']
  comment?: string | undefined
  type?: 'Album' | 'Video'
}) => {
  const { user, login } = usePrivy()
  const { wallet } = usePrivyWagmi()
  const { chain } = useNetwork()
  const saleStrategyAddress = token?.salesStrategies[0]?.fixedPrice?.configAddress!
  const mintFee = BigInt(collection?.mintFeePerQuantity || 0)

  let config
  if (wallet?.address !== undefined && collection) {
    config = getZora1155PrepareConfig(
      saleStrategyAddress,
      collection.address,
      wallet?.address as `0x${string}`,
      Number(token.tokenId),
      collection.mintFeePerQuantity,
      comment
    )
  }

  const {
    config: prepareConfig,
    error: prepareError,
    isError: isPrepareError,
    isIdle,
  } = usePrepareContractWrite({ ...config, enabled: !!wallet?.address })
  const {
    write: mint,
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
    error: writeError,
  } = useContractWrite(prepareConfig)

  const handleClick = useCallback(
    (e: { preventDefault: () => void }) => {
      e.preventDefault()

      if (!user) return login()
      if (chain?.id !== ZORA_CHAIN_ID) return wallet?.switchChain(ZORA_CHAIN_ID)

      return mint?.()
    },
    [user, login, mint, chain?.id, wallet]
  )

  return (
    <Modal
      trigger={
        <button
          className={
            'inline-flex self-start items-center bg-white text-black border rounded py-2 px-8 uppercase text-sm'
          }
        >
          Mint {type ? type : ''}
          <div className={'flex w-5 h-5 ml-4'}>
            <Zorb />
          </div>
        </button>
      }
    >
      <div className={'p-4'}>
        <div className={'w-full sm:w-[500px]'}>
          <div className={'flex flex-col'}>
            <div className={'flex gap-3'}>
              {collection?.metadata?.image && (
                <div className={'py-4 rounded'}>
                  <Image
                    src={getIpfsGateway(collection?.metadata?.image)}
                    alt={`album cover image for ${collection?.metadata?.name}`}
                    width={150}
                    height={150}
                  />
                </div>
              )}
              <div className={'flex flex-col text-black uppercase'}>
                <div className={'italic'}>{collection?.metadata?.name}</div>
                <div>
                  <a
                    href={`https://explorer.zora.energy/token/${collection?.address}`}
                    target={'_blank'}
                  >
                    {shortenAddress(collection?.address)}
                  </a>
                </div>
              </div>
            </div>
            <div className={'flex flex-col max-h-[200px] overflow-y-scroll'}>
              <div
                key={token.tokenId}
                className={'text-black py-2 border-b border-black'}
              >
                <div>{token.metadata?.name}</div>
              </div>
            </div>
            <div className={'flex flex-col text-black py-2 mt-12 border-t'}>
              <div>1 {type ? type : 'token'}</div>
              <div>Total: {parseFloat(formatEther(mintFee))} ETH</div>
            </div>
          </div>
          <button
            className={
              'inline-flex items-center justify-center bg-black text-white py-4 px-8 rounded w-full mt-8 text-sm uppercase'
            }
            onClick={handleClick}
            disabled={isPrepareError}
          >
            Mint {type ? type : ''}
            <div className={'flex w-5 h-5 ml-3'}>
              <Zorb />
            </div>
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default MintButton
