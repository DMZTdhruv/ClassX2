// routes/protected/userProfileRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createUserProfileController } from "../../controllers/profile/index.js";

const router = express.Router();

router.post(
  "/create-user-profile",
  authenticateUserToken,
  createUserProfileController
);

export default router;