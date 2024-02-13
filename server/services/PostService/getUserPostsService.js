import UserProfileRepository from '../../repositories/UserProfileRepository.js'

export default async function getUserPostsService(userProfileId) {
  try {
    const userProfileRepo = new UserProfileRepository()
    const userPosts = await userProfileRepo.getUserPosts(userProfileId)
    return {
      data: userPosts,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
