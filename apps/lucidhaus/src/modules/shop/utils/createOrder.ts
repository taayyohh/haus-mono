import { IOrder } from '@/models/Order'

export async function createOrder(order: IOrder, token: string): Promise<any> {
  try {
    const response = await fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    })

    return await response.json()
  } catch (err) {
    console.error('create order error', err)
    return false
  }
}
