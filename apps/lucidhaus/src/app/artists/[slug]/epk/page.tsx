import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { EPK_COOKIE_NAME } from '@/constants'
import checkEPKAccess from '@/modules/epk/utils/checkEPKAccess'
import PasswordGate from '@/modules/epk/components/PasswordGate'
import EPKPage from '@/modules/epk/components/EPKPage'

export default async function Page(context: any) {
  const slug = context.params.slug

  // Check if user has access
  const cookieStore = cookies()
  const epkCookie = cookieStore.get(EPK_COOKIE_NAME)
  const hasAccess = await checkEPKAccess(epkCookie)

  // If no access, show password gate
  if (!hasAccess) {
    return <PasswordGate slug={slug} />
  }

  // If has access, show EPK page
  return <EPKPage slug={slug} />
}

type Props = {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const artistName = params.slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    title: `${artistName} - EPK | LUCIDHAUS`,
    description: `Electronic Press Kit for ${artistName}`,
    robots: {
      index: false,
      follow: false,
    },
  }
}
