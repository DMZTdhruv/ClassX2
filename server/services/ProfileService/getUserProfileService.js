import UserProfileRepository from '../../repositories/UserProfileRepository.js'

export const getUserProfileService = async (user, res) => {
  const { userProfileId } = user
  try {
    const userProfileRepo = new UserProfileRepository()
    const userProfile = await userProfileRepo.findById(userProfileId);
    if (!userProfile) {
      return res.status(400).json({ error: `Failed to get the profile information` })
    }
    return res.status(200).json({ data: userProfile })
  } catch (err) {
    console.log(err.message)

    throw new Error(err.message)
  }
}
