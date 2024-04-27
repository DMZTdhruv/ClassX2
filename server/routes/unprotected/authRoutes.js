// routes/unprotected/authRoutes.js
import express from 'express'
import {
  userSignUpController,
  userSignInController,
} from '../../controllers/auth/index.js'
import { checkUserController } from '../../controllers/auth/checkUserController.js'
import { logOutController } from '../../controllers/auth/logOutController.js'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'
import { getAuthUserData } from '../../controllers/auth/getAuthUserData.js'

const router = express.Router()

router.post('/signUp', userSignUpController)
router.post('/signIn', userSignInController)
router.post('/logout', logOutController)
router.get('/check-user', checkUserController)
router.get('/authenticatedUserData', authenticateUserToken, getAuthUserData)

export default router
