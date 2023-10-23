import jwt from 'jsonwebtoken'
import config from '@/constants/config'

const SECRET_KEY = config.orderSecret
export function afterPaymentSuccess(email: string) {
  return jwt.sign({ email, timestamp: Date.now() }, SECRET_KEY!, {
    expiresIn: '10m',
  })
}
