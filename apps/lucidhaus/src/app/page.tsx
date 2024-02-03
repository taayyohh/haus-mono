import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import { randomSong } from '@/utils/randomSong'
import HomePage from '@/modules/business/components/Home'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  metadataBase: new URL('https://www.lucid.haus'),
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    description: 'Timeless, post-genre, Black music.',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
        ),
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'LUCIDHAUS',
    card: 'summary_large_image',
    description: 'Timeless, post-genre, Black music.',
    site: '@lucidhaus',
    creator: '@lucidhaus',
    images: getIpfsGateway(
      'ipfs://bafkreictv3m2xnxqh7yvulrots3w3t3fbnqe32migivqonmxvwhh2qtbuy'
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
