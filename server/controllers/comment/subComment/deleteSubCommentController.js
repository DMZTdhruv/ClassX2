import deleteSubCommentService from '../../../services/Comment/SubComment/deleteSubCommentService.js'

export default async function deleteSubCommentController(req, res) {
  const { subCommentID } = req.params
  const { userProfileId } = req.user
  try {
    const result = await deleteSubCommentService(subCommentID, userProfileId)
    res.status(201).json(result)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}
