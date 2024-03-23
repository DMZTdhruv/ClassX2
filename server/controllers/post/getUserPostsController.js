import getUserPostsService from '../../services/PostService/getUserPostsService.js'

export default async function getUserPostsController(req, res) {
  const { page, limit } = req.query
  const currentPage = parseInt(page) || 1
  const itemsPerPage = parseInt(limit) || 10
  const startIndex = (currentPage - 1) * itemsPerPage

  console.log(req.query)
  try {
    const { userProfileId } = req.params
    console.log(userProfileId)
    const result = await getUserPostsService(startIndex, itemsPerPage, userProfileId)
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json(err.message)
  }
}
