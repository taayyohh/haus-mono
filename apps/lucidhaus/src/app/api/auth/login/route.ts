import { User as PrivyUser } from '@privy-io/react-auth'
import jwt from 'jsonwebtoken'
import connectDb from '@/modules/auth/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import { LOGIN_COOKIE_NAME } from '@/constants'
import config from '@/constants/config'

const secretKey = process.env.JWT_SECRET || ''

export type AuthUser = {
  privyId: string
  role: 'user' | 'superadmin'
}

const generateToken = (user: PrivyUser) => {
  const adminWallets = process.env.ADMIN_WALLETS?.split(',')

  const role = adminWallets?.includes(String(user?.wallet?.address))
    ? 'superadmin'
    : 'user'

  const authUser: AuthUser = {
    privyId: user.id,
    role,
  }

  return jwt.sign(authUser, secretKey)
}

export const POST = connectDb(async (req: NextRequest) => {
  const { user } = await req.json()

  try {
    // Set cookie
    const token = generateToken(user)
    const response = NextResponse.json(
      { message: 'Logged In' },
      { status: 201, headers: {} }
    )

    response.cookies.set(LOGIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax', // Set a suitable SameSite attribute value
      secure: process.env.NODE_ENV === 'production', // Set secure flag for production environment
      path: '/', // Set the cookie path as per your application needs
      // maxAge: 60 * 60, // Set the maximum age of the cookie in seconds (1 hour in this case)
    })

    return response
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 })
  }
})
