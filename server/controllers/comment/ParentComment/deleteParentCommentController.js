import deleteParentCommentService from '../../../services/Comment/ParentComment/deleteParentCommentService.js'

export default async function deleteParentComment(req, res) {
  const { commentId } = req.params
  const { userProfileId } = req.user
  try {
    const result = await deleteParentCommentService(userProfileId, commentId)
    res.status(201).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
