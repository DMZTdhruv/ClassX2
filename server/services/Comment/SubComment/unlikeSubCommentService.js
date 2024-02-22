import CommentRepository from '../../../repositories/CommentRepository.js'

export const unlikeSubComment = async (commentId, userID) => {
  try {
    const commentRepository = new CommentRepository()

    // finding comment
    const comment = await commentRepository.findSubCommentById(commentId)
    if (!comment) {
      throw new Error('Comment does not exists')
    }

    // checking if like exists
    const likeExits = comment.likes.includes(userID);
    if (!likeExits) {
      throw new Error(
        `${userID} has not liked the comment: ${commentId}`
      )
    }

    comment.likes.remove(userID)
    const unlikedComment = await comment.save()
    return {
      data: unlikedComment,
      message: `Unliked comment ${commentId}`
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
