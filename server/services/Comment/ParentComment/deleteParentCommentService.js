import CommentRepository from '../../../repositories/CommentRepository.js'
import ReplyCommentRepo from '../../../repositories/ReplyCommentRepo.js'
import { delete_parent_comment_validator } from '../../../validations/CommentValidtor/deleteCommentValidator.js'
import PostRepository from '../../../repositories/PostRepository.js'

export default async function deleteParentCommentService(
  userProfileId,
  commentId
) {
  try {
    delete_parent_comment_validator(commentId, userProfileId)
    const commentRepo = new CommentRepository()
    const replyCommentRepo = new ReplyCommentRepo()
    const postRepo = new PostRepository()

    const commentTodelete = await commentRepo.findCommentByIdWithPostedBy(
      commentId
    )

    if (!commentTodelete) {
      throw new Error('Comment not found')
    }

    if (commentTodelete.postedBy._id.toString() !== userProfileId) {
      throw new Error(`Failed to delete the comment`)
    }
    const post = await postRepo.findPostById(commentTodelete.postId)
    post.comments.remove(commentId)
    await post.save()

    //deleting all the replies of the parent comment
    await replyCommentRepo.deleteCommentByParentCommentId(commentId)
    // deleting main comment
    await commentRepo.deleteComment(commentId)

    return {
      message: `Deleted comment ${commentId}`,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
