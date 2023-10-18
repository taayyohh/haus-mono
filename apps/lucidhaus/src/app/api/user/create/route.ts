import connectDb from '@/modules/auth/utils/db'
import { NextRequest, NextResponse } from 'next/server'
import User from '@/models/User'

export const POST = connectDb(async (req: NextRequest) => {
  const { customer, privyUser } = await req.json()
  const privyId = privyUser.id

  try {
    // Check if a user with this privyId already exists
    const existingUser = await User.findOne({ privyId })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 })
    }

    const user = new User({ customer, privyUser, privyId })
    await user.save()

    return NextResponse.json({ message: 'User added to db' }, { status: 201 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Error logging in' }, { status: 500 })
  }
})
