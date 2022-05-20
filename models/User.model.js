import mongoose from 'mongoose'
import validator from 'validator'
import { ROLES } from '../utils/enums.js'

const userSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
      lowercase: [true, 'an email should be in lowercase.'],
      validate: [validator.isEmail, 'please provide a valid email.'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'please provide your phone number.'],
      unique: [true, 'this phone number is already taken.'],
      validate: [
        validator.isMobilePhone,
        'please provide a valid phone number.',
      ],
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(ROLES),
      default: ROLES.CUSTOMER,
    },
    uid: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('User', userSchema)
