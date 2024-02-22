import { likeSubComment } from '../../../services/Comment/SubComment/likeSubCommentservice.js'
import { validateCommentLike } from '../../../validations/commentValidator.js'

export const likeSubCommentController = async (req, res) => {
  const { commentId, userID } = req.body
  console.log(commentId, userID)
  try {
    validateCommentLike(commentId, userID)
    const result = await likeSubComment(commentId, userID)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
