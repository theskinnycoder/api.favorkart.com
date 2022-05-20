import asyncHandler from 'express-async-handler'
import { adminAuth } from '../lib/firebase-admin.js'
import User from '../models/User.model.js'
import { ROLES } from '../utils/enums.js'

export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    res.status(401)
    throw new Error('Unauthenticated')
  } else {
    const { uid } = await adminAuth.verifyIdToken(token)
    const user = await User.findOne({ uid: uid })
    if (!user) {
      throw new Error('User not found')
    } else {
      req.user = user
      next()
    }
  }
})

export const isVendor = asyncHandler(async (req, res, next) => {
  if (req.user.role === ROLES.VENDOR) {
    next()
  } else {
    res.status(403)
    throw new Error('Unauthorized as a vendor')
  }
})

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role === ROLES.ADMIN) {
    next()
  } else {
    res.status(403)
    throw new Error('Unauthorized as an admin')
  }
})
