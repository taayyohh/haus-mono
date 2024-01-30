import { NextRequest, NextResponse } from 'next/server'
import isUser from '@/modules/auth/utils/isUser'

export function authenticateUser(
  routeHandler: (req: NextRequest) => Promise<NextResponse>
) {
  return async function protectedRouteHandler(req: NextRequest) {
    if (!(await isUser(req))) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
    return routeHandler(req)
  }
}
