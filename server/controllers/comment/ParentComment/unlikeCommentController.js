import unlikeCommentService from '../../../services/Comment/ParentComment/unlikeCommentService.js'
import { validateCommentunLike } from '../../../validations/CommentValidtor/commentValidator.js'

export default async function unlikeCommentController(req, res) {
  const { commentId, userID } = req.body
  try {
    validateCommentunLike(commentId, userID)
    const result = await unlikeCommentService(commentId, userID)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
