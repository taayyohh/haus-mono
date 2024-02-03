import { fetchAlbum } from '@/modules/albums/utils/fetchAlbum'
import { onchainAlbumFetch } from '@/modules/albums/utils/onchainAlbumFetch'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export const dynamic = 'force-dynamic'

export default async function Page(context: any) {
  const { data: album } = await fetchAlbum(context.params.slug)

  return <div>hi</div>
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
    metadataBase: new URL('https://www.lucid.haus'),
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
