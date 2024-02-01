// routes/protected/userProfileRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createPostController } from "../../controllers/post/createPostController.js";

const router = express.Router();

router.post(
  "/create-post",
  authenticateUserToken,
  createPostController
);

export default router;