import Me from '@/modules/auth/components/Me'
import { fetchOnrampSession } from '@/modules/store/utils/fetchOnrampSession'

export default async function Page() {
  const { data: onramp } = await fetchOnrampSession()

  return <Me onramp={onramp} />
}
