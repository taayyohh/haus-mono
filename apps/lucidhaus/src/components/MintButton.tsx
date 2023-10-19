'use client'

import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import Zorb from '../../public/icons/zorb.svg'
import { Modal } from '@/components/Modal'
import MintModal from '@/components/MintModal'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'
import { useNetwork } from 'wagmi'
import { ZORA_CHAIN_ID } from '@/constants'
import { usePrivy } from '@privy-io/react-auth'

const MintButton = ({
  collection,
  token,
  type,
  comment,
  clean = false,
}: {
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
  collection: ZoraCreateContractQuery['zoraCreateContract']
  comment?: string | undefined
  type?: 'Album' | 'Video'
  clean?: boolean
}) => {
  const { chain } = useNetwork()
  const { wallet } = usePrivyWagmi()
  const { user, login } = usePrivy()

  if (chain?.id !== ZORA_CHAIN_ID || !user)
    return (
      <div>
        <button
          className={
            'inline-flex self-start items-center bg-white text-black border rounded py-2 px-8 uppercase text-sm'
          }
          onClick={!!user ? () => wallet?.switchChain(ZORA_CHAIN_ID) : () => login()}
        >
          {!clean && <div className={'mr-4'}> Mint {type ? type : ''}</div>}
          <div className={'flex w-5 h-5'}>
            <Zorb />
          </div>
        </button>
      </div>
    )

  return (
    <Modal
      trigger={
        <button
          className={
            'inline-flex self-start items-center bg-white text-black border rounded py-2 px-8 uppercase text-sm'
          }
        >
          {!clean && <div className={'mr-4'}> Mint {type ? type : ''}</div>}
          <div className={'flex w-5 h-5'}>
            <Zorb />
          </div>
        </button>
      }
    >
      <MintModal token={token} collection={collection} comment={comment} />
    </Modal>
  )
}

export default MintButton
