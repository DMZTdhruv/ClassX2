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
import getUserProfileDetailsController from '../../controllers/profile/getUserProfileDetails.controller.js'
import { editProfileController } from '../../controllers/profile/editProfileController.js'

const router = express.Router()

router.get('/', authenticateUserToken, getUserProfileDetailsController)

//User profile routes
router.post('/create-user-profile', createUserProfileController)

router.get('/get-user-profile', authenticateUserToken, getUserProfileController)

router.get(
  '/get-user-posts/:userProfileId',
  authenticateUserToken,
  getUserPostsController
)

router.get(
  '/users-of-division',
  authenticateUserToken,
  getUserProfilesByDivisionNameController
)

router.get('/userprofile', authenticateUserToken, GetUserProfileByUsernameController)

// following routes
router.post('/follow', authenticateUserToken, followUserController)

router.post('/unFollow', authenticateUserToken, unfollowUserController)

router.get('/isFollowing', authenticateUserToken, checkIfUserIsFollowingController)

// Patch routes
router.post('/edit-profile', authenticateUserToken, editProfileController)

export default router
