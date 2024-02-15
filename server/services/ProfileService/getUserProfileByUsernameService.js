import UserProfileRepository from '../../repositories/UserProfileRepository.js'

export default async function getUserProfileByUsernameService(username) {
  try {
    const userProfileRepo = new UserProfileRepository()
    const users = await userProfileRepo.findByUsernameFilter(username)
    return {
      data: users
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
