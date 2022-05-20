import express from 'express'
import {
  createOrder,
  getAllOrdersOfCustomer,
  getOrderByID,
  getUndeliveredOrderByID,
  getUndeliveredOrders,
  markOrderAsDelivered,
} from '../controllers/orders.controller.js'
import { isAdmin, protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .get('/', protect, isAdmin, getUndeliveredOrders)
  .get('/:id', protect, isAdmin, getUndeliveredOrderByID)
  .patch('/:id', protect, isAdmin, markOrderAsDelivered)

router
  .route('/me')
  .get(protect, getAllOrdersOfCustomer)
  .post(protect, createOrder)

router.get('/me/:id', protect, getOrderByID)

export default router
