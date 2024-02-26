import CommentRepository from '../../repositories/CommentRepository.js'
import ReplyCommentRepo from '../../repositories/ReplyCommentRepo.js'
import UserRepository from '../../repositories/UserRepository.js';
import { delete_parent_comment_validator } from '../../validations/deleteCommentValidator.js';

export default async function deleteParentCommentService(userProfileId, userId, commentId) {
  try {
    delete_parent_comment_validator(commentId);
    const commentRepo = new CommentRepository()
    const replyCommentRepo = new ReplyCommentRepo()
    const userRepo = new UserRepository();

    const user = await userRepo.findByID(userProfileId);
    if(user._id !== userId){
      throw new Error("Failed to delete the post")
    } 

    const commentTodelete = await commentRepo.findCommentById(commentId)
    if (!commentTodelete) {
      throw new Error('Comment not found')
    }

    //deleting all the replies of the parent comment
    await replyCommentRepo.deleteCommentByParentCommentId(commentId)
    // deleting main comment
    await commentRepo.deleteComment(commentId)

    return {
      message: `Delted comment ${commentId}`,
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
