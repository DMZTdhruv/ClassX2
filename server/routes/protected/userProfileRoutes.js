// routes/protected/userProfileRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createUserProfileController } from "../../controllers/profile/index.js";
import { getUserProfileController } from "../../controllers/profile/getUserProfileController.js";
import getUserProfilesByDivisionNameController from "../../controllers/profile/getUserProfilesByDivisionNameController.js";
import getUserPostsController from "../../controllers/post/getUserPostsController.js";
import GetUserProfileByUsernameController from "../../controllers/profile/getUserProfileByUsernameController.js";
import followUserController from "../../controllers/profile/followUserController.js";
import checkIfUserIsFollowingController from "../../controllers/profile/checkUserIsFollowingController.js";

const router = express.Router();

//User profile routes
router.post(
  "/create-user-profile",
  authenticateUserToken,
  createUserProfileController
);

router.get(
  "/get-user-profile",
  authenticateUserToken,
  getUserProfileController
)

router.get(
  "/get-user-posts",
  authenticateUserToken,
  getUserPostsController
)

router.get(
  "/users-of-division",
  authenticateUserToken,
  getUserProfilesByDivisionNameController
) 

router.get(
  "/userprofile",
  authenticateUserToken,
  GetUserProfileByUsernameController
)


// following routes
router.post(
  "/follow",
  authenticateUserToken,
  followUserController
)

router.get(
  "/isFollowing",
  authenticateUserToken,
  checkIfUserIsFollowingController
)


export default router;