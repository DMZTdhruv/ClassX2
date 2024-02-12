
import unlikePostService from "../../services/PostService/unLikePostService.js"

export const unLikePostController = async (req, res) => {
  try {
    const { userProfileID, postId} = req.body
    const result = await unlikePostService(userProfileID, postId)
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
