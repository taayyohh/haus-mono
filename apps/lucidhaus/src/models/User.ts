import mongoose, { Document, Schema } from 'mongoose'
import { User as PrivyUser } from '@privy-io/react-auth'

export interface IUser extends Document {
  privyId: string
  customer: any
  privyUser: PrivyUser
  role: string
}

const userSchema = new Schema<IUser>({
  privyId: { type: String, unique: true, required: true },
  customer: { type: Object },
  privyUser: { type: Object },
  role: { type: String },
})

// Check if the model is already registered
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema)

export default User
