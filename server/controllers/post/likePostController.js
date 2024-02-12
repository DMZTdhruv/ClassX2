import likePostService from "../../services/PostService/likePostService.js"

export const likePostController = async (req, res) => {
  try {
    const { userProfileID, postId} = req.body
    console.log(userProfileID, postId)
    const result = await likePostService(userProfileID, postId)
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
