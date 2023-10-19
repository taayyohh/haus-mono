import { fetchAlbums } from '@/modules/albums/utils/fetchAlbums'
import AlbumCard from '@/modules/albums/components/AlbumCard'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IAlbum } from '@/models/Album'
import { IArtist } from '@/models/Artist'
import { Metadata } from 'next'
import { getIpfsGateway } from '@/utils/getIpfsGetway'

export const metadata: Metadata = {
  title: 'LUCIDHAUS',
  description: 'Timeless, post-genre, Black music.',
  openGraph: {
    title: 'LUCIDHAUS',
    images: [
      {
        url: getIpfsGateway(
          'ipfs://bafybeigm23wpntkvhdaqvuaebhwibwoqtdmopz2l4gbr2ri7d64dr6hzwa'
        ),
        width: 800,
        height: 600,
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
      'ipfs://bafybeigm23wpntkvhdaqvuaebhwibwoqtdmopz2l4gbr2ri7d64dr6hzwa'
    ),
  },
}

export default async function Page() {
  const { data } = await fetchAlbums(1, 30)
  const albums = await Promise.all(
    data?.map(async (album) => {
      const { data: artist } = await fetchArtist(album.primaryArtist)
      return { ...album, artist } as IAlbum & { artist: IArtist }
    })
  )

  return (
    <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full mx-auto'}>
      {albums && albums.map((album) => <AlbumCard album={album} key={album._id} />)}
    </div>
  )
}
