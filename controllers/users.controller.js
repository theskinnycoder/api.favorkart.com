import asyncHandler from 'express-async-handler'
import { adminAuth } from '../lib/firebase-admin.js'
import User from '../models/User.model.js'
import Product from '../models/Product.model.js'

export const createUser = asyncHandler(async (req, res) => {
  const { uid, role, phoneNumber } = req.body

  const newUser = new User({
    uid: uid,
    role,
    phoneNumber,
  })

  await adminAuth.setCustomUserClaims(uid, {
    role,
  })

  await newUser.save()
  res.status(201).json({ data: newUser })
})

export const updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await User.findOneAndUpdate(
    { uid: req?.user?.uid },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  res.status(200).json({ data: updatedUser })
})

export const deleteUser = asyncHandler(async (req, res) => {
  const uid = req?.user?.uid

  await adminAuth.deleteUser(uid)
  await User.findOneAndDelete({ uid })
  await Product.find({
    vendor: uid,
  }).deleteMany()

  res.status(204).json({ data: null })
})
