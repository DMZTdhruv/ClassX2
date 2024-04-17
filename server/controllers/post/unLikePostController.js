import unlikePostService from '../../services/PostService/unLikePostService.js'

export const unLikePostController = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { postId } = req.params
    const { statusCode, response } = await unlikePostService(userProfileId, postId)
    res.status(statusCode).json(response)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
