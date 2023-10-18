import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/constants/config'

const SECRET_KEY = config.orderSecret // A strong secret key stored in environment variables

function orderProtect(routeHandler: (req: NextRequest) => Promise<NextResponse>) {
  return async function protectedOrderRouteHandler(req: NextRequest) {
    const token = req.headers.get('authorization')

    if (!token) {
      return NextResponse.json(
        { error: 'No authorization token provided' },
        { status: 401 }
      )
    }

    try {
      jwt.verify(token, SECRET_KEY!)

      // Additional checks can be extended here if necessary

      return routeHandler(req)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid or expired order token' },
        { status: 403 }
      )
    }
  }
}

export default orderProtect
