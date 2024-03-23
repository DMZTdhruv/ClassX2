import UserProfileRepository from '../../repositories/UserProfileRepository.js'

export default async function getUserPostsService(
  startIndex,
  itemsPerPage,
  userProfileId
) {
  try {
    const userProfileRepo = new UserProfileRepository()
    const userPosts = await userProfileRepo.getUserPosts(
      startIndex,
      itemsPerPage,
      userProfileId
    )
    return {
      data: userPosts,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
