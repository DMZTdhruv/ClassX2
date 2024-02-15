import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import validateFollow from '../../validations/FollowUserValidator.js'

export default async function followUserService(userId, userToFollowId) {
  try {
    validateFollow(userId, userToFollowId)

    const userRepo = new UserProfileRepository()
    //checking users
    checkUsers(userId, userToFollowId)

    // checking if the current user is already following
    userRepo.checkUserFollowStatus(userId,userToFollowId);

    const result = await userRepo.followUser(userId, userToFollowId)
    console.log(result)
    return {
      data: result,
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

const checkUsers = (userId, userToFollowId) => {
  const userRepo = new UserProfileRepository()

  const currentUserExists = userRepo.findById(userId)
  if (!currentUserExists) {
    throw new Error(`User with id: ${userId} doesn't exists`)
  }

  const userToFollowExists = userRepo.findById(userToFollowId)
  if (!userToFollowExists) {
    throw new Error(`Failed to follow user with the id: ${userToFollowId}`)
  }
}
