import express from 'express'
import {
  createProduct,
  deleteProduct,
  getAllProductsByVendor,
  getProductByID,
  updateProduct,
} from '../controllers/products.controller.js'
import { isVendor, protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .get(getAllProductsByVendor)
  .post(protect, isVendor, createProduct)
  .patch(protect, isVendor, updateProduct)
  .delete(protect, isVendor, deleteProduct)

router.get('/:id', getProductByID)

export default router
