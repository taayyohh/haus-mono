import VideoEditForm from '@/modules/videos/components/VideoEditForm'

export default async function Page(context: any) {
  return <VideoEditForm slug={context.params.slug} />
}
