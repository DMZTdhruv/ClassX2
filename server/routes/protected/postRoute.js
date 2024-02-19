// routes/protected/userProfileRoutes.js
import express from 'express'
import { authenticateUserToken } from '../../middlewares/authMiddleware.js'
import { createCommentController } from '../../controllers/comment/createCommentController.js'
import { likeCommentController } from '../../controllers/comment/likeCommentController.js'
import { replyCommentController } from '../../controllers/comment/replyCommentController.js'
import {
  createPostController,
  getPostController,
  likePostController,
  unLikePostController
} from "../../controllers/post/index.js"
import { getPostByIdController } from '../../controllers/post/getPostController.js'

const router = express.Router()

//post routes
router.post('/create-post', authenticateUserToken, createPostController)

//like post routes
router.post('/like-post', authenticateUserToken, likePostController)
router.post('/unlike-post', authenticateUserToken, unLikePostController)

//Comment routes
router.post(
  '/comment/create-comment',
  authenticateUserToken,
  createCommentController
)

router.post(
  '/comment/like-comment',
  authenticateUserToken,
  likeCommentController
)

router.post(
  '/comment/reply-comment',
  authenticateUserToken,
  replyCommentController
)

//Get routes
router.get('/get-post', authenticateUserToken, getPostController)

router.get("/", authenticateUserToken, getPostByIdController)

export default router