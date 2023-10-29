'use client'

import { useCursorFetch } from '@/hooks/useCursorInfiniteFetch'
import { MintComment, MintCommentSchema } from '@/modules/comments/MintCommentSchema'
import Comment from '@/modules/comments/Comment'

export default function Comments({ endpoints }: { endpoints: string[] | undefined }) {
  const { data: comments, total } = useCursorFetch<MintComment>({
    endpoints: endpoints || [],
    schema: MintCommentSchema,
  })

  return (
    <div className={'mt-12  flex flex-col'}>
      <div className={'pb-2 uppercase text-sm'}>{total || '0'} Comments</div>
      <div
        className={'border border-white-13 p-4 rounded max-h-[225px] overflow-y-scroll'}
      >
        {comments &&
          comments?.map((comment) => (
            <Comment comment={comment} key={comment.transaction_info.transaction_hash} />
          ))}
      </div>
    </div>
  )
}
