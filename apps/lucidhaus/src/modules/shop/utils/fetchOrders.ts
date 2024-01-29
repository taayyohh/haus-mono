import config from '@/constants/config'
import { IOrder } from '@/models/Order'
import { LOGIN_COOKIE_NAME } from '@/constants'
import { cookies } from 'next/headers'

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? ''
}

export async function fetchOrders(page = 1, limit = 50): Promise<{ data: IOrder[] }> {
  const cookie = await getCookie(LOGIN_COOKIE_NAME)

  let response
  try {
    response = await fetch(`${config.BASE_URL}api/orders?page=${page}&limit=${limit}`, {
      method: 'GET',
      headers: { Cookie: `${LOGIN_COOKIE_NAME}=${cookie}` },
    })
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: [] }
  }
}
