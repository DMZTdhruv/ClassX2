// routes/protected/userProfileRoutes.js
import express from 'express'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'
import {
  createUserProfileController,
  getUserProfilesByDivisionNameController,
  GetUserProfileByUsernameController,
  followUserController,
  checkIfUserIsFollowingController,
  unfollowUserController,
} from '../../controllers/profile/index.js'

import { getUserProfileController } from '../../controllers/profile/getUserProfileController.js'
import getUserPostsController from '../../controllers/post/getUserPostsController.js'

const router = express.Router()

//User profile routes
router.post(
  '/create-user-profile',
  createUserProfileController
)

router.get('/get-user-profile', authenticateUserToken, getUserProfileController)

router.get('/get-user-posts', authenticateUserToken, getUserPostsController)

router.get(
  '/users-of-division',
  authenticateUserToken,
  getUserProfilesByDivisionNameController
)

router.get(
  '/userprofile',
  authenticateUserToken,
  GetUserProfileByUsernameController
)

// following routes
router.post('/follow', authenticateUserToken, followUserController)

router.post('/unFollow', authenticateUserToken, unfollowUserController)

router.get(
  '/isFollowing',
  authenticateUserToken,
  checkIfUserIsFollowingController
)

export default router
