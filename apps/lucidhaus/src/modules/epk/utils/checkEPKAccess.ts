import jwt, { JwtPayload } from 'jsonwebtoken'
import { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

const secretKey = process.env.JWT_SECRET || ''

async function checkEPKAccess(cookie?: RequestCookie): Promise<boolean> {
  if (!cookie) {
    // If the cookie is not present, return false
    return false
  }

  let decodedToken: string | JwtPayload
  try {
    decodedToken = jwt.verify(cookie.value, secretKey) // Verify the token
  } catch (err) {
    // If the token is invalid or expired, return false
    return false
  }

  // Make sure decodedToken is an object and has the expected structure
  if (typeof decodedToken === 'object' && 'access' in decodedToken) {
    // If the token has 'epk' access, return true
    return decodedToken.access === 'epk'
  }

  return false
}

export default checkEPKAccess
