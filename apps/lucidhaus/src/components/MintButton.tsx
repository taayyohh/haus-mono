'use client'

import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import Zorb from '../../public/icons/zorb.svg'
import { Modal } from '@/components/Modal'
import MintModal from '@/components/MintModal'

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
