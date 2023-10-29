'use client'

import { MintComment } from '@/modules/comments/MintCommentSchema'
import { useEnsAvatar, useEnsName } from 'wagmi'
import { Address } from 'viem'
import { useMemo } from 'react'
import { shortenAddress } from '@/utils/shortenAddress'
import Haus from '../../../public/icons/haus-alt.svg'
import DateFormatter from '@/components/DateFormatter'

export default function Comment({ comment }: { comment: MintComment }) {
  const { data: ens } = useEnsName({
    address: comment.from_address as Address,
    chainId: 1,
  })

  const { data: ensUrl } = useEnsAvatar({ name: ens, enabled: !!ens, chainId: 1 })
  const commenter = useMemo(() => {
    return ens || shortenAddress(comment.from_address)
  }, [ens, comment?.from_address])

  return (
    <div
      className={
        'relative flex rounded border-b border-white-13 pb-2 mb-4 gap-4 items-center px-2'
      }
    >
      <div
        className={
          'flex items-center justify-center  h-8 w-8 border-white-13 rounded-full overflow-hidden'
        }
      >
        {(ensUrl && (
          <img src={ensUrl} alt={'ens avatar'} style={{ width: '100%' }} />
        )) || (
          <div className={'h-6 w-6 border-white-13'}>
            <Haus />
          </div>
        )}
      </div>
      <div className={'flex flex-col'}>
        <div style={{ wordBreak: 'break-word' }}>{comment.comment}</div>
        <div className={'text-xs opacity-70 hover:opacity-100'}>
          <a href={`https://zora.co/${comment.from_address}`} target={'_blank'}>
            {commenter}
          </a>
        </div>
        <div className={'text-xs absolute right-4 opacity-70 hover:opacity-100 italic'}>
          <a
            href={`https://explorer.zora.energy/tx/${comment.transaction_info.transaction_hash}`}
            target={'_blank'}
          >
            <DateFormatter date={new Date(comment.transaction_info.block_timestamp)} />
          </a>
        </div>
      </div>
    </div>
  )
}
