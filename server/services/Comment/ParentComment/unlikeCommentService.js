import CommentRepository from '../../../repositories/CommentRepository.js'

export default async function unlikeCommentService(commentId, userProfileId) {
  try {
    const commentRepository = new CommentRepository()

    // finding comment
    const comment = await commentRepository.findCommentById(commentId)
    if (!comment) {
      throw new Error('Comment does not exists')
    }

    // checking if like exists
    const likeExits = comment.likes.includes(userProfileId);
    if(!likeExits) {
      throw new Error(`${userProfileId} has not liked the comment: ${commentId}`)
    }

    
    comment.likes.remove(userProfileId)
    const unlikedComment = await comment.save()
    return {
      message: unlikedComment,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
