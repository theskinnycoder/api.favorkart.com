import asyncHandler from 'express-async-handler'
import { adminAuth } from '../lib/firebase-admin.js'
import User from '../models/User.model.js'
import { ROLES } from '../utils/enums.js'

export const getVendorByDisplayName = asyncHandler(async (req, res) => {
  const displayName = req?.params?.displayName

  const user = await User.findOne({
    displayName,
  })

  if (!user) {
    throw new Error(`User with displayName ${displayName} not found`)
  }

  res.json({ data: user })
})

export const getAllVendors = asyncHandler(async (_req, res) => {
  const users = await User.find({
    role: ROLES.VENDOR,
  })
  res.json({ data: users })
})

export const makeVendor = asyncHandler(async (req, res) => {
  const { uid, _id } = await User.findOne({
    uid: req?.body?.customerID,
  })

  await adminAuth.setCustomUserClaims(uid, {
    role: ROLES.VENDOR,
  })
  const user = await User.findOneAndUpdate(
    { _id, role: ROLES.CUSTOMER },
    { role: ROLES.VENDOR },
    { new: true, runValidators: true },
  )

  if (!user) {
    throw new Error(`User not found`)
  }
  res.json({ data: user })
})

export const removeVendor = asyncHandler(async (req, res) => {
  const { uid, _id } = await User.findOne({
    uid: req?.body?.vendorID,
  })

  await adminAuth.setCustomUserClaims(uid, {
    role: ROLES.CUSTOMER,
  })
  const user = await User.findOneAndUpdate(
    { _id, role: ROLES.VENDOR },
    { role: ROLES.CUSTOMER },
    { new: true, runValidators: true },
  )

  if (!user) {
    throw new Error(`User not found`)
  }
  res.json({ data: user })
})

export const deleteVendor = asyncHandler(async (req, res) => {
  const { uid, _id } = await User.findOne({
    uid: req?.body?.vendorID,
  })

  await adminAuth.deleteUser(uid)
  const deletedUser = await User.findOneAndDelete({
    _id,
    role: ROLES.VENDOR,
  })

  if (!deletedUser) {
    throw new Error(`User not found`)
  }
  res.json({ data: deletedUser })
})
