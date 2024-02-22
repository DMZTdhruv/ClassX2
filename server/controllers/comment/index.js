import { createCommentController } from './createCommentController.js'
import { likeCommentController } from './ParentComment/likeCommentController.js'
import { replyCommentController } from './replyCommentController.js'
import unlikeCommentController from './ParentComment/unlikeCommentController.js'
import { likeSubCommentController } from './subComment/likeSubCommentController.js'
import { unlikeSubCommentController } from './subComment/unlikeSubCommentController.js'

export {
  createCommentController,
  likeCommentController,
  replyCommentController,
  unlikeCommentController,
  likeSubCommentController,
  unlikeSubCommentController,
}
