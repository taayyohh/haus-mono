import { User } from '@privy-io/react-auth'

export const handlePrivySuccess = async (privyUser: User, isNewUser: boolean) => {
  const savedCustomer = await fetch('/api/stripe/customers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      metadata: {
        privyId: privyUser.id,
      },
    }),
  })
  const customer = await savedCustomer.json()

  try {
    await fetch('/api/user/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customer,
        privyUser,
      }),
    })
  } catch (err) {
    console.log('err')
  }

  await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: privyUser }),
  })
}
