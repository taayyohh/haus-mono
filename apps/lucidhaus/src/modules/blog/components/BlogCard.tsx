import DateFormatter from '@/components/DateFormatter'
import Image from 'next/image'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import Link from 'next/link'
import { IArtist } from '@/models/Artist'
import { IBlogPost } from '@/models/Blog'
import { ZoraCreateContractQuery, ZoraCreateTokenQuery } from '@/graphql/sdk.generated'
import { MediaPlayer, MediaProvider } from '@vidstack/react'
import MintButton from '@/components/MintButton'
import Comments from '@/modules/comments/Comments'

export default function BlogCard({
  post,
  token,
  collection,
}: {
  post: IBlogPost
  token: ZoraCreateTokenQuery['zoraCreateTokens'][0]
  collection: ZoraCreateContractQuery['zoraCreateContract']
}) {
  return (
    <div
      className={
        'flex flex-col items-center justify-center border-b pb-4 pb-4 border-white-13 h-full'
      }
    >
      <div className={'relative flex flex-col w-full h-full rounded overflow-hidden'}>
        <div className={'flex flex-col text-sm mb-4 text-white'}>
          <div className={'italic'}>{post.title}</div>
          {post.publishedDate && <DateFormatter date={new Date(post.publishedDate)} />}
        </div>
        <div className={'mb-6 sm:mb-0 relative flex h-full items-center justify-center'}>
          <MediaPlayer
            title={`${token?.metadata?.name}`}
            src={{
              src: getIpfsGateway(token?.metadata?.animationUrl || ''),
              type: 'video/mp4',
            }}
            controls={true}
            poster={getIpfsGateway(post.thumbnailUri!)}
          >
            <MediaProvider />
          </MediaPlayer>
        </div>
        <div className={'flex flex-col gap-2 mt-8'}>
          <div className={'italic'}>
            {Number(token?.totalMinted) > 1
              ? `${token?.totalMinted} mints`
              : `${token?.totalMinted} mint`}
          </div>
        </div>
        <div className={'mt-4'}>
          {token && collection && (
            <MintButton collection={collection} token={token} type={'Video'} />
          )}
        </div>
        {/*<Comments comments={comments} commentTotal={commentTotal} />*/}
      </div>
    </div>
  )
}
