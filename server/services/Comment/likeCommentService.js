import CommentRepository from '../../repositories/CommentRepository.js'

export const likeComment = async (commentId, userID) => {
  try {
    const commentRepository = new CommentRepository()

    const comment = await commentRepository.findCommentById(commentId)

    if (!comment) {
      throw new Error('Comment does not exists')
    }

    const likedComment = await commentRepository.pushLike(comment._id, userID);

    return {
      message: likedComment
    }
    
  } catch (err) {
    return {
      message: err.message,
    }
  }
}
