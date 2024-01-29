// import { LOGIN_COOKIE_NAME } from '@/constants'
// import { IOrder } from '@/models/Order'
// import { getCookie } from '@/modules/auth/utils/getCookie'
// import config from '@/constants/config'

// export const fetchUserOrder = async (
//   orderId: string
// ): Promise<{ data: IOrder | null }> => {
//   try {
//     const cookie = getCookie(LOGIN_COOKIE_NAME)
//
//     if (!cookie) {
//       throw new Error('No authentication token found')
//     }
//
//     const response = await fetch(
//       `${config.BASE_URL}api/orders/user/${encodeURIComponent(orderId)}`, // Endpoint to get a specific order
//       {
//         method: 'GET',
//         headers: { Cookie: `${LOGIN_COOKIE_NAME}=${cookie}` },
//       }
//     )
//
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`)
//     }
//
//     return { data: (await response.json()) as IOrder }
//   } catch (error) {
//     console.error('Error fetching specific user order:', error)
//     return { data: null }
//   }
// }
//

import config from '@/constants/config'
import { IOrder } from '@/models/Order'
import { LOGIN_COOKIE_NAME } from '@/constants'
import { cookies } from 'next/headers'

const getCookie = async (name: string) => {
  return cookies().get(name)?.value ?? ''
}

export async function fetchUserOrder(
  orderId: string
): Promise<{ data: IOrder | undefined }> {
  const cookie = await getCookie(LOGIN_COOKIE_NAME)

  let response
  try {
    response = await fetch(
      `${config.BASE_URL}api/orders/user/${encodeURIComponent(orderId)}`,
      {
        method: 'GET',
        headers: { Cookie: `${LOGIN_COOKIE_NAME}=${cookie}` },
      }
    )
    const data = await response.json()
    return { data }
  } catch (err) {
    console.log('err', err)
    return { data: undefined }
  }
}
