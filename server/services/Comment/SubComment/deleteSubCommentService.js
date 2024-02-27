import { delete_sub_comment_validator } from '../../../validations/deleteCommentValidator.js'
import CommentRepository from '../../../repositories/CommentRepository.js'
import ReplyCommentRepo from '../../../repositories/ReplyCommentRepo.js'

export default async function deleteSubCommentService(
  deleteCommentId,
  userProfileId
) {
  try {
    delete_sub_comment_validator(deleteCommentId, userProfileId)
    const commentRepo = new CommentRepository()
    const replyCommentRepo = new ReplyCommentRepo()

    // checking if reply comment exits
    const replyComment = await replyCommentRepo.findCommentById(deleteCommentId)
    if (!replyComment) {
      throw new Error('Comment does not exits')
    }
    if (replyComment.postedBy._id.toString() !== userProfileId) {
      throw new Error(`Failed to delete the comment`)
    }

    await replyCommentRepo.deleleCommentById(deleteCommentId)

    // deleting the reply entry from the parent comment
    const comment = await commentRepo.findCommentById(
      replyComment.parentCommentId
    )
    comment.commentReplies.remove(deleteCommentId)
    await comment.save()

    return {
      message: 'Successfully deleted reply',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
