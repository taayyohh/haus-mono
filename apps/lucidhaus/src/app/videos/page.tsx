import { fetchVideos } from '@/modules/videos/utils/fetchVideos'
import VideoCard from '@/modules/videos/components/VideoCard'
import { fetchArtist } from '@/modules/artists/utils/fetchArtist'
import { IMusicVideo } from '@/models/MusicVideo'
import { IArtist } from '@/models/Artist'

export default async function Page() {
  const { data } = await fetchVideos(1, 20)
  const videos = await Promise.all(
    data?.map(async (video) => {
      const { data: artist } = await fetchArtist(video.primaryArtist)
      return { ...video, artist } as IMusicVideo & { artist: IArtist }
    })
  )

  return (
    <div>
      <div
        className={
          'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8 w-full mx-auto justify-center'
        }
      >
        {videos && videos.map((video) => <VideoCard video={video} key={video._id} />)}
      </div>
    </div>
  )
}
