import { unlikeSubComment } from '../../../services/Comment/SubComment/unlikeSubCommentService.js'
import { validateCommentunLike } from '../../../validations/commentValidator.js'

export const unlikeSubCommentController = async (req, res) => {
  const { commentId, userID } = req.body
  try {
    validateCommentunLike(commentId, userID)
    const result = await unlikeSubComment(commentId, userID)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
