import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { shortenAddress } from '@/utils/shortenAddress'
import { formatEther } from 'viem'
import Zorb from '../../public/icons/zorb.svg'
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
  comment,
}: {
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
  collection: ZoraCreateContractQuery['zoraCreateContract']
  comment?: string | undefined
  type?: 'Album' | 'Video'
}) {
  const { user, login } = usePrivy()
  const { address } = useAccount()
  const { chain } = useNetwork()
  const saleStrategyAddress = token?.salesStrategies[0]?.fixedPrice?.configAddress!
  const mintFee = BigInt(collection?.mintFeePerQuantity || 0)

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
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({ ...config, enabled: !!address })

  const {
    write: mint,
    data: writeData,
    isLoading: writeLoading,
    isSuccess: writeSuccess,
    error: writeError,
  } = useContractWrite(prepareConfig)

  const {
    data: txReceipt,
    isSuccess,
    isFetching,
  } = useWaitForTransaction({
    hash: writeData?.hash,
  })

  console.log('TX', txReceipt)

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
          <div className={'flex flex-col text-white py-2 mt-12'}>
            <div>1 {type ? type : 'token'}</div>
            <div>Total: {parseFloat(formatEther(mintFee))} ETH</div>
          </div>
        </div>
        <button
          className={
            'inline-flex items-center justify-center bg-[#1b1b1b] hover:bg[#111] border border-white-13 text-white py-4 px-8 rounded w-full mt-8 text-sm uppercase'
          }
          onClick={() => mint?.()}
          disabled={isPrepareError && chain?.id === ZORA_CHAIN_ID && !!user}
        >
          Mint {type ? type : ''}
          <div className={'flex w-5 h-5 ml-3'}>
            <Zorb />
          </div>
        </button>
      </div>
    </div>
  )
}
