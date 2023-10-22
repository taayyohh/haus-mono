import Link from 'next/link'
import { IMusicVideo } from '@/models/MusicVideo'

export default function VideoEditList({ videos }: { videos: IMusicVideo[] }) {
  return (
    <div className={'flex flex-col'}>
      <div className={'flex-flex-col'}>
        {videos?.map((video) => (
          <div key={video._id}>
            <Link href={`/admin/videos/edit/${video.slug}`}>{video.title}</Link>
          </div>
        ))}
      </div>
    </div>
  )
}
