import asyncHandler from 'express-async-handler'
import Order from '../models/Order.model.js'

export const getAllOrdersOfCustomer = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    customer: req?.user?._id,
  })

  if (!orders) throw new Error('No orders found')

  res.json({
    data: orders,
  })
})

export const getOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req.params.id,
    customer: req?.user?._id,
  })

  if (!order) throw new Error('No order found')

  res.json({
    data: order,
  })
})

export const createOrder = asyncHandler(async (req, res) => {
  const order = await Order.create({
    ...req.body,
    customer: req?.user?._id,
  })

  if (!order) throw new Error('Order not created')

  res.json({
    data: order,
  })
})

export const getUndeliveredOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    isDelivered: false,
  })

  if (!orders) throw new Error('No orders found')

  res.json({
    data: orders,
  })
})

export const getUndeliveredOrderByID = asyncHandler(async (req, res) => {
  const order = await Order.findOne({
    _id: req?.params?.id,
    isDelivered: false,
  })

  if (!order) {
    throw new Error(`Order not found`)
  }
  res.json({
    data: order,
  })
})

export const markOrderAsDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findOneAndUpdate(
    { _id: req?.params?.id, isDelivered: false },
    { isDelivered: true },
    { new: true, runValidators: true },
  )

  if (!order) {
    throw new Error(`Order not found`)
  }

  res.json({
    data: order,
  })
})
