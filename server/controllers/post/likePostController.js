import likePostService from '../../services/PostService/likePostService.js'

export const likePostController = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { postId } = req.params
    const {statusCode, response} = await likePostService(userProfileId, postId)
    res.status(statusCode).json(response)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
