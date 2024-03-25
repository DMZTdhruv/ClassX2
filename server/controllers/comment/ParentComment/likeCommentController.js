import { likeComment } from '../../../services/Comment/ParentComment/likeCommentService.js'
import { validateCommentLike } from '../../../validations/CommentValidtor/commentValidator.js'

export const likeCommentController = async (req, res) => {
  const { commentId, userID } = req.body
  try {
    validateCommentLike(commentId, userID)
    const result = await likeComment(commentId, userID)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
