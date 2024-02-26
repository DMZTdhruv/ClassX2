import deleteParentCommentService from '../../../services/Comment/deletParentCommentService.js'

export default async function deleteParentComment(req, res) {
  const { commentId, userId } = req.params
  const { userProfileId } = req.next
  try {
    const result = await deleteParentCommentService(userProfileId, userId, commentId)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
