'use client'

import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { shortenAddress } from '@/utils/shortenAddress'
import {
  Address,
  encodeFunctionData,
  EncodeFunctionDataParameters,
  formatEther,
} from 'viem'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { usePrivy } from '@privy-io/react-auth'
import {
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
  useWaitForTransaction,
} from 'wagmi'
import { useEffect, useMemo, useState } from 'react'
import { ZORA_CHAIN_ID } from '@/constants'
import {
  zoraUniversalMinterABI,
  zoraUniversalMinterAddress,
} from '@zoralabs/universal-minter'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { getZora1155PrepareConfig } from '@/utils/getZora1155PrepareConfig'
import Zorb from '../../public/icons/zorb.svg'
import Haus from '../../public/icons/haus-alt-2.svg'

function getMintBatchArgs({
  userAddress,
  tokens,
  collection,
  comment,
}: {
  userAddress?: `0x${string}`
  tokens: ZoraCreateTokenQuery['zoraCreateTokens']
  collection: ZoraCreateContractQuery['zoraCreateContract']
  comment: string
}) {
  if (!userAddress)
    return { targets: [], calldatas: [], values: [], totalTxnValue: BigInt(0) }

  type Calldata = `0x${string}`
  const targets: Array<Address> = []
  const values: Array<bigint> = []
  const calldatas: Array<Calldata> = []
  let totalTxnValue = BigInt(0)

  tokens?.forEach((token) => {
    const saleStrategyAddress = token?.salesStrategies[0]?.fixedPrice?.configAddress
    if (!saleStrategyAddress) return

    let prepareConfig
    if (!!userAddress && !!collection?.address && !!token?.tokenId) {
      prepareConfig = getZora1155PrepareConfig(
        saleStrategyAddress,
        collection?.address as `0x${string}`,
        userAddress as `0x${string}`,
        Number(token.tokenId),
        collection?.mintFeePerQuantity as string,
        comment
      )
    }

    if (!prepareConfig?.abi || !prepareConfig?.args) return

    // @ts-ignore
    const calldata = encodeFunctionData({
      abi: prepareConfig.abi,
      functionName: prepareConfig.functionName,
      args: prepareConfig.args,
    } as EncodeFunctionDataParameters<typeof prepareConfig.abi, typeof prepareConfig.functionName>)

    totalTxnValue += prepareConfig.value ?? BigInt(0)

    targets.push(collection?.address as `0x${string}`)
    values.push(BigInt(prepareConfig.value ?? 0))
    calldatas.push(calldata)
  })

  return { targets, values, calldatas, totalTxnValue }
}
export default function MintBatchModal({
  tokens,
  collection,
  type = 'Album',
}: {
  tokens: ZoraCreateTokenQuery['zoraCreateTokens']
  collection: ZoraCreateContractQuery['zoraCreateContract']
  type?: string
}) {
  const { user } = usePrivy()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const mintFee = BigInt(collection?.mintFeePerQuantity || 0)
  const [comment, setComment] = useState<string>('')

  const { targets, values, calldatas, totalTxnValue } = useMemo(() => {
    return getMintBatchArgs({
      userAddress: address as `0x${string}`,
      tokens,
      collection,
      comment,
    })
  }, [address, tokens, collection, comment])

  const prepareConfig = {
    chainId: ZORA_CHAIN_ID,
    address: zoraUniversalMinterAddress[ZORA_CHAIN_ID],
    abi: zoraUniversalMinterABI,
    functionName: 'mintBatchWithoutFees',
    args: [targets, calldatas, values],
    value: totalTxnValue,
  } as UsePrepareContractWriteConfig<
    typeof zoraUniversalMinterABI,
    'mintBatchWithoutFees'
  >

  const {
    config: writeConfig,
    isLoading: isPrepareLoading,
    error: prepareError,
    isError: isPrepareError,
    isIdle,
    refetch,
  } = usePrepareContractWrite({
    ...prepareConfig,
    enabled: !!address,
  })

  const {
    write: mintBatch,
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
    error: writeError,
  } = useContractWrite({
    ...writeConfig,
  })

  const { data: txReceipt } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  useEffect(() => {
    if (address && isIdle) refetch()
  }, [address, isIdle, refetch])

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
                <div className={'flex flex-col text-white py-2 mt-2 text-sm'}>
                  <div>{tokens.length} tracks</div>
                  <div>
                    <span className={'text-xs'}>Total:</span>{' '}
                    {parseFloat(formatEther(mintFee)) * tokens.length} ETH
                  </div>
                </div>
              </div>
            </div>
          </div>
          <label className={'text-xs uppercase pb-2'}>Tokens</label>
          <div
            className={
              'flex flex-col max-h-[200px] overflow-y-scroll border border-white-13 p-2 px-6 rounded pb-4'
            }
          >
            {tokens &&
              tokens.map((token) => (
                <div
                  key={token.tokenId}
                  className={'text-white py-2 border-solid border-b border-white-13'}
                >
                  <div>{token.metadata?.name}</div>
                </div>
              ))}
          </div>
          <div className={'flex flex-col text-white py-2 mt-4'}>
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
        </div>
        <button
          className={`inline-flex items-center justify-center bg-[#1b1b1b] ${
            !isDisabled && 'hover:bg-[#111]'
          } border border-white-13 text-white py-4 px-8 rounded w-full mt-6 text-sm uppercase`}
          onClick={() => mintBatch?.()}
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
