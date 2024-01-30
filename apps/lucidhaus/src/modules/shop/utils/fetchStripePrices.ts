import config from '@/constants/config'

export async function fetchStripePrices(productId: string) {
  try {
    const response = await fetch(
      `${config.BASE_URL}/api/stripe/prices?productId=${encodeURIComponent(productId)}`,
      {
        method: 'GET',
      }
    )

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Error fetching Stripe prices')
    }

    return await response.json()
  } catch (error) {
    console.error('Error fetching Stripe prices:', error)
    throw error
  }
}
