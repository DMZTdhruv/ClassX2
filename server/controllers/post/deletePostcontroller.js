import deletePostService from "../../services/PostService/deletePostService.js"

export default async function deletePostController(req, res) {
  const { deletePostId } = req.params
  const { userProfileId } = req.user
  try {
    const result = await deletePostService(deletePostId, userProfileId)
    res.status(201).json(result)
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
}
