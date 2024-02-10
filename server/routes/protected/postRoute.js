// routes/protected/userProfileRoutes.js
import express from "express";
import Post from "../../models/post/post.model.js";
import { authenticateUserToken } from "../../middlewares/authMiddleware.js";
import { createPostController } from "../../controllers/post/createPostController.js";
import { paginatedResults } from "../../middlewares/paginatedResults.js";
import { getPostController } from "../../controllers/post/getPostController.js";
import { createCommentController } from "../../controllers/comment/createCommentController.js";
import { likeCommentController } from "../../controllers/comment/likeCommentController.js";
import { replyCommentController } from "../../controllers/comment/replyCommentController.js";

const router = express.Router();

//post routes
router.post(
  "/create-post",
  authenticateUserToken,
  createPostController
);



//comment post routes
router.post(
  "/comment/create-comment",
  authenticateUserToken,  
  createCommentController
)

router.post(
  "/comment/like-comment",
  authenticateUserToken,
  likeCommentController
)

router.post(
  "/comment/reply-comment",
  authenticateUserToken,
  replyCommentController
)


//Get routes
router.get(
  "/get-post",
  authenticateUserToken,
  getPostController
)


export default router;