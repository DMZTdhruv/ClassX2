// routes/protected/userProfileRoutes.js
import express from "express";
<<<<<<< HEAD
import { createUserProfileController } from "../../controllers/createUserProfile.js";
import { authenticateUserToken } from "../../middlewares/authenticateUser.js";

const router = express.Router();
=======
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createUserProfileController } from "../../controllers/profile/index.js";

const router = express.Router();

router.post(
  "/create-user-profile",
  authenticateUserToken,
  createUserProfileController
);
>>>>>>> main

router.post("/user-profile", authenticateUserToken,  createUserProfileController);

export default router;