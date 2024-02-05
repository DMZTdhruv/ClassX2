// routes/protected/userProfileRoutes.js
import express from "express";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createPostController } from "../../controllers/post/createPostController.js";
import { paginatedResults } from "../../middlewares/paginatedResults.js";
import Post from "../../models/post/post.model.js";
import { getPostController } from "../../controllers/post/getPostController.js";
import { createCommentController } from "../../controllers/comment/createCommentController.js";

const router = express.Router();

//post routes
router.post(
  "/create-post",
  authenticateUserToken,
  createPostController
);

router.post(
  "/create-comment",
  authenticateUserToken,  
  createCommentController
)

//Get routes
router.get(
  "/get-post",
  authenticateUserToken,
  paginatedResults(Post),
  getPostController
)


export default router;