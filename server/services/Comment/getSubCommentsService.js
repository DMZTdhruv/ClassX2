import CommentRepository from '../../repositories/CommentRepository.js'

export default async function getSubCommentsService(parentCommentId) {
  try {
    const commentRepo = new CommentRepository()
    const parentComment = await commentRepo.findCommentById(parentCommentId)
    if (!parentComment) {
      throw new Error(
        'This comment was deleted by the creator / does not exists'
      )
    }

    const { commentReplies } = await commentRepo.subCommentsOfParentComment(
      parentCommentId
    )
    return {
      data: commentReplies,
    }
  } catch (error) {
    console.log(error.message);
    throw new Error(error.message)
  }
}
