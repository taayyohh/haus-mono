import jwt from 'jsonwebtoken'
import config from '@/constants/config'

const SECRET_KEY = config.orderSecret
export function afterPaymentSuccess(user: any) {
  return jwt.sign({ userId: user.id, timestamp: Date.now() }, SECRET_KEY!, {
    expiresIn: '10m',
  })
}
