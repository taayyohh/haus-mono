import AlbumPage from '@/modules/albums/components/AlbumPage'
import { fetchAlbum } from '@/modules/albums/utils/fetchAlbum'
import { onchainAlbumFetch } from '@/modules/albums/utils/onchainAlbumFetch'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'
import { useMemo } from 'react'
import { generateMintCommentEndpoints } from '@/modules/comments/utils/comments'

export default async function Page(context: any) {
  const { data: album } = await fetchAlbum(context.params.slug)
  const { collection, tokens, artist } = await onchainAlbumFetch(album)
  const mintCommentEndpoints = generateMintCommentEndpoints(tokens)

  return (
    <AlbumPage
      album={album}
      collection={collection}
      tokens={tokens}
      artist={artist}
      mintCommentEndpoints={mintCommentEndpoints}
    />
  )
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  const { data: album } = await fetchAlbum(params.slug)
  const { collection, tokens, artist } = await onchainAlbumFetch(album)

  return {
    title: `LUCIDHAUS - ${album.title}`,
    description:
      collection?.metadata?.description || 'Timeless, post-genre, Black music.',
    openGraph: {
      title: `LUCIDHAUS - ${album.title}`,
      description:
        collection?.metadata?.description || 'Timeless, post-genre, Black music.',
      images: [
        {
          url: getIpfsGateway(album.coverImageUri),
          width: 1200,
          height: 630,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `LUCIDHAUS - ${album.title}`,
      description: 'Timeless, post-genre, Black music.',
      site: '@lucidhaus',
      creator: '@lucidhaus',
      images: getIpfsGateway(album.coverImageUri),
    },
  }
}
