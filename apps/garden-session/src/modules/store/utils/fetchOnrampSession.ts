import config from '@/constants/config'

export async function fetchOnrampSession() {
  try {
    const response = await fetch(`${config.BASE_URL}api/stripe/onramp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        transaction_details: {
          destination_currency: 'eth',
          source_exchange_amount: '100',
          destination_network: 'ethereum',
        },
        wallet_addresses: '',
      }),
    })
    const data = await response.json()
    return { ...data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
