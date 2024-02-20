import getSubCommentsService from '../../services/Comment/getSubCommentsService.js'

export default async function getSubCommentsController(req, res) {
  const { parentCommentId } = req.query
  try {
    const result = await getSubCommentsService(parentCommentId)
    res.status(200).json(result)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
