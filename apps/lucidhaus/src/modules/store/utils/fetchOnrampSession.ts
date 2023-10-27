import config from '@/constants/config'
import axios from 'axios'

export async function fetchOnrampSession() {
  try {
    const response = await axios.post(
      `${config.BASE_URL}api/stripe/onramp`,
      {
        transaction_details: {
          destination_currency: 'eth',
          source_exchange_amount: '100',
          destination_network: 'ethereum',
        },
        wallet_addresses: '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    const data = response.data
    return { ...data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
