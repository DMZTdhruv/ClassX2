import { createUserProfile } from '../../services/ProfileService/userProfileService.js'

export const createUserProfileController = async (req, res) => {
  try {
    const {
      userID,
      name,
      username,
      about,
      userProfileImage,
      enrollmentNumber,
      branchName,
      semesterNumber,
      divisionName,
      isPrivate,
      friends,
      posts,
      groups,
      email,
      password,
    } = req.body

    await createUserProfile(
      userID,
      name,
      username,
      about,
      userProfileImage,
      enrollmentNumber,
      branchName,
      semesterNumber,
      divisionName,
      isPrivate,
      friends,
      posts,
      groups,
      email,
      password,
      res
    )
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ message: error.message })
  }
}
