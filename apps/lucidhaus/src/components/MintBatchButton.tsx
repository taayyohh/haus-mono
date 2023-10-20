'use client'

import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import Zorb from '../../public/icons/zorb.svg'
import { Modal } from '@/components/Modal'
import MintBatchModal from '@/components/MintBatchModal'
import { useNetwork } from 'wagmi'
import { ZORA_CHAIN_ID } from '@/constants'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { usePrivy } from '@privy-io/react-auth'

export default function MintBatchButton({
  tokens,
  collection,
  type = 'Album',
}: {
  tokens: ZoraCreateTokenQuery['zoraCreateTokens']
  collection: ZoraCreateContractQuery['zoraCreateContract']
  type?: string
}) {
  const { chain } = useNetwork()
  const { wallet } = usePrivyWagmi()
  const { user, login } = usePrivy()

  if (chain?.id !== ZORA_CHAIN_ID || !user)
    return (
      <button
        className={
          'inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-4 px-8 uppercase text-sm'
        }
        onClick={!!user ? () => wallet?.switchChain(ZORA_CHAIN_ID) : () => login()}
      >
        Mint {type ? type : ''}
        <div className={'flex w-5 h-5 ml-4'}>
          <Zorb />
        </div>
      </button>
    )

  return (
    <Modal
      trigger={
        <button
          className={
            'inline-flex self-start items-center bg-[#1b1b1b] text-white border border-white-13 rounded py-4 px-8 uppercase text-sm'
          }
        >
          Mint {type ? type : ''}
          <div className={'flex w-5 h-5 ml-4'}>
            <Zorb />
          </div>
        </button>
      }
    >
      <MintBatchModal tokens={tokens} collection={collection} />
    </Modal>
  )
}
