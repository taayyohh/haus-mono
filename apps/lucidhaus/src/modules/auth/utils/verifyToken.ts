import jwt, { JwtPayload } from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'
import { NextRequest } from 'next/server'
import { AuthUser } from '@/app/api/auth/login/route'

const secretKey = process.env.JWT_SECRET || ''

export interface AuthenticatedRequest extends NextRequest {
  user?: AuthUser
}

export const verifyToken = async (cookie?: RequestCookie): Promise<AuthUser | null> => {
  if (!cookie) {
    // If the cookie is not present, return null
    return null
  }

  let decodedToken: string | JwtPayload
  try {
    decodedToken = jwt.verify(cookie.value, secretKey) // Verify the token
  } catch (err) {
    // If the token is invalid, return null
    return null
  }

  // Check if decodedToken is an object and cast it to AuthUser
  if (typeof decodedToken === 'object' && 'privyId' in decodedToken) {
    return decodedToken as AuthUser
  }

  return null
}
