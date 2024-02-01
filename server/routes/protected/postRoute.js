// routes/protected/userProfileRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createPostController } from "../../controllers/post/createPostController.js";
import { paginatedResults } from "../../middlewares/paginatedResults.js";
import Post from "../../models/post/post.model.js";
import { getPostController } from "../../controllers/post/getPostController.js";

const router = express.Router();

router.post(
  "/create-post",
  authenticateUserToken,
  createPostController
);

router.get(
  "/get-post",
  authenticateUserToken,
  paginatedResults(Post),
  getPostController
)

export default router;