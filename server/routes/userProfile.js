import express from 'express'
import { createUserProfileController } from '../controllers/createUserProfileController.js'
import { authenticateUserToken } from '../middlewares/authenticateUser'
const router = express.Router()

router.post('/user-profile', authenticateUserToken, createUserProfileController)

export default router
