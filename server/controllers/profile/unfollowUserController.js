import unFollowUserService from "../../services/ProfileService/unfollowUserService.js"

export default async function unfollowUserController(req, res) {
  const { userProfileId } = req.user
  const { userToUnfollowId } = req.body

  try {
    const result = await unFollowUserService(userProfileId, userToUnfollowId)
    res.status(201).json(result);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ message: err.message })
  }
}
