import { fetchVideos } from '@/modules/videos/utils/fetchVideos'
import VideoEditList from '@/modules/videos/components/VideoEditList'

export default async function Page(context: any) {
  const { data: videos } = await fetchVideos()

  return <VideoEditList videos={videos} />
}
