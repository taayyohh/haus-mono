import jwt from 'jsonwebtoken'
import config from '@/constants/config'
import { NextResponse } from 'next/server'

const SECRET_KEY = config.orderSecret
export async function POST(req: Request) {
  // Get email from the request body
  const { email } = await req.json()

  // Check if email is provided
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    const token = jwt.sign({ email, timestamp: Date.now() }, SECRET_KEY!, {
      expiresIn: '10m',
    })
    return NextResponse.json({ token }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ error: 'Error generating token' }, { status: 500 })
  }
}
