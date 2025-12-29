import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { EPK_COOKIE_NAME } from '@/constants'

const secretKey = process.env.JWT_SECRET || ''

export type EPKAuthPayload = {
  slug: string
  access: 'epk'
  exp: number
}

export async function POST(req: NextRequest) {
  const { slug, password } = await req.json()

  // Verify password against environment variable
  const expectedPassword = process.env.EPK_PASSWORD

  if (!expectedPassword || password !== expectedPassword) {
    return NextResponse.json({ error: 'Incorrect password' }, { status: 401 })
  }

  // Generate JWT token with 24-hour expiration
  const payload: EPKAuthPayload = {
    slug,
    access: 'epk',
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hours
  }

  const token = jwt.sign(payload, secretKey)

  // Set cookie
  const response = NextResponse.json({ success: true }, { status: 200 })

  response.cookies.set(EPK_COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours in seconds
  })

  return response
}
