import mongoose, { Schema } from 'mongoose'
import { User as PrivyUser } from '@privy-io/react-auth'

export interface IUser {
  privyId: string
  customer: any
  privyUser: PrivyUser
  role: string
}

const userSchema = new Schema({
  privyId: { type: String, unique: true, required: true },
  customer: { type: Object },
  privyUser: { type: Object },
  role: { type: String },
})

// Check if the model is already registered
const User = mongoose.model('User', userSchema)

export default User
