import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import config from '@/constants/config'

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
      jwt.verify(token.split(' ')[1], config.orderSecret!)

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
