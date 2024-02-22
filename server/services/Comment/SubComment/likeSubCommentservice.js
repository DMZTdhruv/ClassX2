import CommentRepository from '../../../repositories/CommentRepository.js'

export const likeSubComment = async (commentId, userID) => {
  try {
    const commentRepository = new CommentRepository()

    // finding comment
    const comment = await commentRepository.findSubCommentById(commentId)
    if (!comment) {
      throw new Error('Comment does not exists')
    }

    // checking like if exist
    const likeExists = comment.likes.includes(userID)
    if (likeExists) {
      throw new Error(`${commentId} comment is already liked by ${userID}`)
    }

    comment.likes.push(userID)
    const likedComment = await comment.save()
    return {
      data:likedComment,
      message: "Successfully liked the comment " + commentId,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
