// routes/protected/userProfileRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createUserProfileController } from "../../controllers/profile/index.js";
import { getUserProfileController } from "../../controllers/profile/getUserProfileController.js";

const router = express.Router();

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

export default router;