import express from 'express'
import {
  createUser,
  deleteUser,
  updateUser,
} from '../controllers/users.controller.js'
import { protect } from '../middleware/auth.middleware.js'

const router = express.Router()

router
  .route('/')
  .post(createUser)
  .patch(protect, updateUser)
  .delete(protect, deleteUser)

export default router
