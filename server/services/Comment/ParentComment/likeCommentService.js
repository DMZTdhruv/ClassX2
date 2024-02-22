import CommentRepository from '../../../repositories/CommentRepository.js'

export const likeComment = async (commentId, userID) => {
  try {
    const commentRepository = new CommentRepository()

    //find comment
    const comment = await commentRepository.findCommentById(commentId)
    if (!comment) {
      throw new Error(`Comment ${commentId} does not exists`)
    }

    const likeExists = comment.likes.includes(userID);
    if(likeExists) {
      throw new Error(`${commentId} comment is already liked by ${userID}`);
    }

    comment.likes.push(userID)
    const likedComment = await comment.save()
    return {
      message: "Successfully liked post",
      data: likedComment,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
