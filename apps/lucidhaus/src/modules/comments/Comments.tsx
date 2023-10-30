import { MintComment } from '@/modules/comments/MintCommentSchema'
import Comment from '@/modules/comments/Comment'

export default function Comments({
  comments,
  commentTotal,
}: {
  comments: MintComment[]
  commentTotal: number
}) {
  return (
    <div className={'mt-12  flex flex-col'}>
      <div className={'pb-2 uppercase text-sm'}>{commentTotal || '0'} Comments</div>
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
