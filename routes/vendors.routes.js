import express from 'express'
import {
  deleteVendor,
  getAllVendors,
  getVendorByDisplayName,
  makeVendor,
  removeVendor,
} from '../controllers/vendors.controller.js'
import { isAdmin, protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router.get('/:displayName', getVendorByDisplayName)
router.route('/').get(getAllVendors).post(protect, isAdmin, makeVendor)
router
  .route('/:id')
  .delete(protect, isAdmin, deleteVendor)
  .patch(protect, isAdmin, removeVendor)

export default router
