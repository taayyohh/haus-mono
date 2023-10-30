import { useState, useEffect, useMemo } from 'react'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { shortenAddress } from '@/utils/shortenAddress'
import { formatEther } from 'viem'
import Zorb from '../../public/icons/zorb.svg'
import Haus from '../../public/icons/haus-alt-2.svg'

import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { usePrivy } from '@privy-io/react-auth'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { getZora1155PrepareConfig } from '@/utils/getZora1155PrepareConfig'
import { ZORA_CHAIN_ID } from '@/constants'

export default function MintModal({
  collection,
  token,
  type,
}: {
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
  collection: ZoraCreateContractQuery['zoraCreateContract']
  type?: 'Album' | 'Video'
}) {
  const { user, login } = usePrivy()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const saleStrategyAddress = token?.salesStrategies[0]?.fixedPrice?.configAddress!
  const mintFee = BigInt(collection?.mintFeePerQuantity || 0)

  const [comment, setComment] = useState<string>('')

  let config
  if (!!address && !!collection?.address && !!token.tokenId) {
    config = getZora1155PrepareConfig(
      saleStrategyAddress,
      collection.address,
      address as `0x${string}`,
      Number(token.tokenId),
      collection.mintFeePerQuantity,
      comment
    )
  }

  const {
    config: prepareConfig,
    isError: isPrepareError,
    error: prepareError,
    isIdle,
    refetch,
  } = usePrepareContractWrite({
    ...config,
    enabled: !!address,
  })

  useEffect(() => {
    if (address && isIdle) refetch()
  }, [isIdle, address, refetch])

  const {
    write: mint,
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
  } = useContractWrite(prepareConfig)

  const { data: txReceipt } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  const insufficientFunds = useMemo(() => {
    return !!prepareError?.toString().includes('insufficient funds')
  }, [prepareError])

  const isDisabled = useMemo(() => {
    return (
      (isPrepareError && chain?.id === ZORA_CHAIN_ID && !!user) ||
      writeLoading ||
      writeSuccess ||
      txReceipt?.status === 'success' ||
      insufficientFunds
    )
  }, [isPrepareError, chain?.id, user, writeLoading, writeSuccess, txReceipt?.status])

  return (
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
            <div className={'flex flex-col text-white uppercase'}>
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
              className={'text-white py-2 border-b border-white-13'}
            >
              <div>{token.metadata?.name}</div>
            </div>
          </div>
          <div className={'flex flex-col text-white py-2 mt-2'}>
            <label htmlFor="comment" className={'text-xs uppercase'}>
              Comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className={
                'p-2 bg-[#1b1b1b] border border-white-13 rounded w-full mt-2 resize-none'
              }
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="₊˚ʚ ᗢ₊˚✧ ﾟ. 𖤐⭒๋࣭ ⭑."
            />
          </div>
          <div className={'flex flex-col text-white py-2 mt-2'}>
            <div>1 {type ? type : 'token'}</div>
            <div>Total: {parseFloat(formatEther(mintFee))} ETH</div>
          </div>
        </div>
        <button
          className={`inline-flex items-center justify-center bg-[#1b1b1b] ${
            !isDisabled && 'hover:bg-[#111]'
          } border border-white-13 text-white py-4 px-8 rounded w-full mt-8 text-sm uppercase`}
          onClick={() => mint?.()}
          disabled={isDisabled}
        >
          {txReceipt?.status === 'success' ? (
            <>{'Minted'}</>
          ) : insufficientFunds ? (
            <>{'Insufficient Funds'}</>
          ) : writeLoading ? (
            <>{'Confirming'}</>
          ) : writeSuccess ? (
            <>{'Minting'}</>
          ) : (
            <>Mint {type ? type : ''}</>
          )}

          <div className={'flex w-5 h-5 ml-3'}>
            {(txReceipt?.status === 'success' && <Haus />) || <Zorb />}
          </div>
        </button>
      </div>
    </div>
  )
}
