import { editProfileService } from '../../services/ProfileService/editProfileService.js'

export const editProfileController = async (req, res) => {
  try {
    const { userProfileId } = req.user
    const { username, name, userProfileImage, bio, privateAccount, gender } = req.body

    const { statusCode, response } = await editProfileService(
      userProfileId,
      username,
      name,
      userProfileImage,
      bio,
      privateAccount,
      gender
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in edit profile controller ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}
