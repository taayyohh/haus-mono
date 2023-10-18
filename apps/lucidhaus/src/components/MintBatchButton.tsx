'use client'

import {
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  UsePrepareContractWriteConfig,
} from 'wagmi'
import {
  zoraUniversalMinterABI,
  zoraUniversalMinterAddress,
} from '@zoralabs/universal-minter'
import {
  ZoraCreateContract,
  ZoraCreateContractQuery,
  ZoraCreateToken,
  ZoraCreateTokenQuery,
} from '@/graphql/sdk.generated'
import {
  Address,
  encodeFunctionData,
  EncodeFunctionDataParameters,
  formatEther,
  parseEther,
} from 'viem'
import { getZora1155PrepareConfig } from '@/utils/getZora1155PrepareConfig'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { useCallback, useMemo } from 'react'
import Zorb from '../../public/icons/zorb.svg'
import { usePrivy } from '@privy-io/react-auth'
import { ZORA_CHAIN_ID } from '@/constants'
import { Modal } from '@/components/Modal'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { shortenAddress } from '@/utils/shortenAddress'

export default function MintBatchButton({
  tokens,
  collection,
  type = 'Album',
}: {
  tokens: ZoraCreateTokenQuery['zoraCreateTokens']
  collection: ZoraCreateContractQuery['zoraCreateContract']
  type?: string
}) {
  const { wallet, setActiveWallet } = usePrivyWagmi()
  const { ready, user, login } = usePrivy()
  const { chain } = useNetwork()
  const mintFee = BigInt(collection?.mintFeePerQuantity || 0)
  function getMintBatchArgs({
    userAddress,
    tokens,
    collection,
  }: {
    userAddress?: `0x${string}`
    tokens: ZoraCreateTokenQuery['zoraCreateTokens']
    collection: ZoraCreateContractQuery['zoraCreateContract']
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
      if (wallet?.address !== undefined && collection) {
        prepareConfig = getZora1155PrepareConfig(
          saleStrategyAddress,
          collection?.address as `0x${string}`,
          wallet?.address as `0x${string}`,
          Number(token.tokenId),
          collection?.mintFeePerQuantity as string,
          ''
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

  const { targets, values, calldatas, totalTxnValue } = useMemo(() => {
    return getMintBatchArgs({
      userAddress: wallet?.address as `0x${string}`,
      tokens,
      collection,
    })
  }, [wallet?.address, tokens, collection])

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
  //
  // const estimatedGas = useEstimatedGas(
  //   prepareConfig as unknown as UsePrepareContractWriteConfig
  // )

  const {
    config: writeConfig,
    isLoading: isPrepareLoading,
    error: prepareError,
    isError: isPrepareError,
    isIdle,
  } = usePrepareContractWrite({
    ...prepareConfig,
    enabled: !!wallet?.address,
    // gas: estimatedGas,
  })

  const {
    write: mintBatch,
    data: writeData,
    isSuccess,
    isLoading: isWriteLoading,
    error: writeError,
  } = useContractWrite({
    ...writeConfig,
    // onMutate,
    // onSuccess: ({ hash }) => {
    //   onSuccess({ hash })
    //   toastDispatch({
    //     type: ToastStatus.REPLACE,
    //     item: {
    //       title: <Label size="sm">Mint Started</Label>,
    //       description: `Your mint of all tokens in ${collection.name} has been submitted.`,
    //       variant: ToastVariant.SUCCESS,
    //       showClose: true,
    //     },
    //   })
    // },
    // onError: (err: Error) => {
    //   onWriteAttemptError(err)
    //   toastDispatch({
    //     type: ToastStatus.REPLACE,
    //     item: {
    //       title: <Label size="sm">Error</Label>,
    //       description: err
    //         ? err.message.match(/User rejected the request/)?.[0] ?? err.message
    //         : 'An error occurred',
    //       variant: ToastVariant.ERROR,
    //       showClose: true,
    //     },
    //   })
    // },
  })

  const handleClick = useCallback(() => {
    if (!user) return login()
    if (chain?.id !== ZORA_CHAIN_ID) return wallet?.switchChain(ZORA_CHAIN_ID)

    return mintBatch?.()
  }, [user, login, mintBatch, chain?.id, wallet])

  return (
    <Modal
      trigger={
        <button
          className={
            'inline-flex self-start items-center bg-white text-black py-4 px-8 rounded uppercase text-sm'
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
              {tokens &&
                tokens.map((token) => (
                  <div
                    key={token.tokenId}
                    className={'text-black py-2 border-b border-black'}
                  >
                    <div>{token.metadata?.name}</div>
                  </div>
                ))}
            </div>
            <div className={'flex flex-col text-black py-2 mt-12 border-black border-t'}>
              <div>{tokens.length} tracks</div>
              <div>Total: {parseFloat(formatEther(mintFee)) * tokens.length} ETH</div>
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
