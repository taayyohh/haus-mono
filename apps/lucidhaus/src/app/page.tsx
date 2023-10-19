import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import { randomSong } from '@/utils/randomSong'
import HomePage from '@/modules/business/components/Home'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafybeib7yvnmqxquhsc4fscbkgeyxol457n4ptn3kdyxvjvduf5ao2qtrm/haus-og.png'
        ),
        width: 800,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    description: 'Timeless, post-genre, Black music.',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafybeib7yvnmqxquhsc4fscbkgeyxol457n4ptn3kdyxvjvduf5ao2qtrm/haus-og.png'
    ),
  },
}
export default async function Page(context: any) {
  const { data: albums } = await fetchAlbums(1, 20)
  const featuredTrack = await randomSong(albums)

  return (
    <div className={'w-full'} style={{ height: 'calc(100vh - 96px)' }}>
      <HomePage track={featuredTrack} />
    </div>
  )
}
