import jwt, { JwtPayload } from 'jsonwebtoken'
import { LOGIN_COOKIE_NAME } from '@/constants'
import { NextRequest } from 'next/server'
import { AuthUser } from '@/app/api/auth/login/route'

const secretKey = process.env.JWT_SECRET || ''
async function isUser(
  req: NextRequest & { user?: AuthUser }
): Promise<AuthUser | undefined> {
  const cookie = req?.cookies.get(LOGIN_COOKIE_NAME)

  if (!cookie) {
    return
  }

  let decodedToken: string | JwtPayload
  try {
    decodedToken = jwt.verify(cookie.value, secretKey) // Verify the token
    return (req.user = decodedToken as AuthUser)
  } catch (err) {
    return
  }
}

export default isUser
