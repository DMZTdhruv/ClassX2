import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import { validateFollow } from '../../validations/followUserValidator.js'

export default async function followUserService(userId, userToFollowId) {
  try {
    validateFollow(userId, userToFollowId)

    const userRepo = new UserProfileRepository()

    //checking users
    checkUsers(userId, userToFollowId)

    // checking if the current user is already following
    const isAlreadyFollowingEachOther = await userRepo.checkUserFollowStatus(userId, userToFollowId)

    if (isAlreadyFollowingEachOther) {
      throw new Error('Already following')
    }

    await userRepo.followUser(userId, userToFollowId)
    return {
      message: `${userId} is now following ${userToFollowId}`,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
