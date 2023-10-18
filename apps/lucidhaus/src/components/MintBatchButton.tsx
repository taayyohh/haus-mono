'use client'

import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import Zorb from '../../public/icons/zorb.svg'
import { Modal } from '@/components/Modal'
import MintBatchModal from '@/components/MintBatchModal'

export default function MintBatchButton({
  tokens,
  collection,
  type = 'Album',
}: {
  tokens: ZoraCreateTokenQuery['zoraCreateTokens']
  collection: ZoraCreateContractQuery['zoraCreateContract']
  type?: string
}) {
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
      <MintBatchModal tokens={tokens} collection={collection} />
    </Modal>
  )
}
