import { replyCommentService } from '../../services/Comment/replyCommentService.js'

export const replyCommentController = async (req, res) => {
  try {
    const { parentCommentId, postId, repliedUserId, commentText, postedBy } =
      req.body
    console.log(req.body)
    const result = await replyCommentService(
      parentCommentId,
      postId,
      repliedUserId,
      commentText,
      postedBy
    )
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
