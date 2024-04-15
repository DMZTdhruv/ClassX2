import express from 'express'
import { authenticateUserToken } from '../../middlewares/authenticateUser.js'
import {
  createCommentController,
  likeCommentController,
  replyCommentController,
  unlikeCommentController,
  likeSubCommentController,
  unlikeSubCommentController,
  deleteParentComment,
} from '../../controllers/comment/index.js'
import {
  createPostController,
  getPostController,
  likePostController,
  unLikePostController,
  getPostByIdController,
  getSubCommentsController,
  deleteSubCommentController,
  deletePostController,
  getTotalPostCount,
  savePostController,
  unSavePostController,
  getAllSavedPost,
  getTotalSavedPostCount,
} from '../../controllers/post/index.js'

const router = express.Router()

// Get routes
router.get('/get-post', authenticateUserToken, getPostController)
router.get('/', authenticateUserToken, getPostByIdController)
router.get('/total-post', authenticateUserToken, getTotalPostCount)
router.get('/total-saved-post', authenticateUserToken)
router.get('/comment/sub-comment', authenticateUserToken, getSubCommentsController)
router.get('/saved-post', authenticateUserToken, getAllSavedPost)
router.get('/total-saved-post', authenticateUserToken, getTotalSavedPostCount)

// Post routes
router.post('/create-post', authenticateUserToken, createPostController)
router.post('/like-post', authenticateUserToken, likePostController)
router.post('/unlike-post', authenticateUserToken, unLikePostController)
router.post('/save-post/:postId', authenticateUserToken, savePostController)
router.post('/unsave-post/:postId', authenticateUserToken, unSavePostController)


// Comment routes
router.post('/comment/create-comment', authenticateUserToken, createCommentController)
router.post('/comment/like-comment', authenticateUserToken, likeCommentController)
router.post('/comment/unlike-comment', authenticateUserToken, unlikeCommentController)

// Sub-comment routes
router.post(
  '/comment/sub/like-comment',
  authenticateUserToken,
  likeSubCommentController
)
router.post(
  '/comment/sub/unlike-comment',
  authenticateUserToken,
  unlikeSubCommentController
)

// Reply comment route
router.post('/comment/reply-comment', authenticateUserToken, replyCommentController)

// Delete routes
// Delete routes for post
router.delete('/delete-post/:deletePostId', authenticateUserToken, deletePostController)

// Delete routes for comments and sub-comments
router.delete(
  '/comment/delete-comment/:commentId',
  authenticateUserToken,
  deleteParentComment
)

router.delete(
  '/comment/subComment/delete-comment/:subCommentID',
  authenticateUserToken,
  deleteSubCommentController
)

export default router
