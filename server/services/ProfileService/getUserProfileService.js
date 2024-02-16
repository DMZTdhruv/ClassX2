import UserProfileRepository from '../../repositories/UserProfileRepository.js'

export const getUserProfileService = async user => {
  const { userID } = user
  try {
    const userProfileRepo = new UserProfileRepository()
    const user = await userProfileRepo.findByUserID(userID)
    if (!user) {
      throw new Error('No user profile found')
    }
    return {
      message: user,
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
