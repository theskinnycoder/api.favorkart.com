import asyncHandler from 'express-async-handler'
import Product from '../models/Product.model.js'
import User from '../models/User.model.js'

export const getAllProductsByVendor = asyncHandler(async (req, res) => {
  const vendor = await User.findOne({ displayName: req?.query?.vendor })

  if (!vendor) {
    throw new Error(`Vendor not found`)
  }

  const products = await Product.find({
    vendor: vendor._id,
  })
  res.json({ data: products })
})

export const getProductByID = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    _id: req?.params?.id,
  })

  if (!product) {
    throw new Error(`Product not found`)
  }
  res.json({ data: product })
})

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = new Product({ ...req.body, vendor: req?.user?._id })
  await newProduct.save()
  res.status(201).json({ data: newProduct })
})

export const updateProduct = asyncHandler(async (req, res) => {
  const updatedProduct = await Product.findOneAndUpdate(
    { _id: req?.params?.id, vendor: req?.user?._id },
    req.body,
    {
      new: true,
      runValidators: true,
    },
  )

  if (!updatedProduct) {
    throw new Error(`Product not found`)
  }
  res.json({ data: updatedProduct })
})

export const deleteProduct = asyncHandler(async (req, res) => {
  const deletedProduct = await Product.findOneAndDelete({
    _id: req?.params?.id,
    vendor: req?.user?._id,
  })

  if (!deletedProduct) {
    throw new Error(`Product not found`)
  }
  res.json({ data: deletedProduct })
})
