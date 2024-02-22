import express from 'express';
import { authenticateUserToken } from '../../middlewares/authMiddleware.js';
import {
  createCommentController,
  likeCommentController,
  replyCommentController,
  unlikeCommentController,
  likeSubCommentController,
  unlikeSubCommentController,
} from "../../controllers/comment/index.js"
import {
  createPostController,
  getPostController,
  likePostController,
  unLikePostController,
  getPostByIdController,
  getSubCommentsController,
} from '../../controllers/post/index.js';

const router = express.Router();

// Post routes
router.post('/create-post', authenticateUserToken, createPostController);
router.post('/like-post', authenticateUserToken, likePostController);
router.post('/unlike-post', authenticateUserToken, unLikePostController);

// Comment routes
router.post('/comment/create-comment', authenticateUserToken, createCommentController);
router.post('/comment/like-comment', authenticateUserToken, likeCommentController);
router.post('/comment/unlike-comment', authenticateUserToken, unlikeCommentController);

// Sub-comment routes
router.post('/comment/sub/like-comment', authenticateUserToken, likeSubCommentController);
router.post('/comment/sub/unlike-comment', authenticateUserToken, unlikeSubCommentController);

// Reply comment route
router.post('/comment/reply-comment', authenticateUserToken, replyCommentController);

// Get routes
router.get('/get-post', authenticateUserToken, getPostController);
router.get('/', authenticateUserToken, getPostByIdController);
router.get('/comment/sub-comment', authenticateUserToken, getSubCommentsController);

export default router;