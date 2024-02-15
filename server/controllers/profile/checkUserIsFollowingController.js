import checkIfUserFollowsService from '../../services/ProfileService/checkIfUserFollowsService.js'

export default async function checkIfUserIsFollowingController(req, res) {
  const { userToFollowId } = req.query
  const { userProfileId } = req.user
  try {
    if (!userProfileId || !userToFollowId) {
      return res.status(400).json({ message: 'incomplete details' })
    }
    const result = await checkIfUserFollowsService(
      userProfileId,
      userToFollowId
    )
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
