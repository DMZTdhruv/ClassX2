import express from "express";
import { createUserProfileController } from "../../controllers/createUserProfile.js";
import { authenticateUserToken } from "../../middlewares/authenticateUser.js";

const router = express.Router();

router.post("/user-profile", authenticateUserToken,  createUserProfileController);

export default router;