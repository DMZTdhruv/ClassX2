import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import validateFollow from '../../validations/FollowUserValidator.js'

export default async function followUserService(userId, userToFollowId) {
  try {
    validateFollow(userId, userToFollowId)

    const userRepo = new UserProfileRepository()


    //checking users
    checkUsers(userId, userToFollowId)

    // checking if the current user is already following
    const isAlreadyFollowingEachOther = await userRepo.checkUserFollowStatus(userId,userToFollowId);

    if(isAlreadyFollowingEachOther){
      throw new Error("Already following")
    }

    await userRepo.followUser(userId, userToFollowId)
    return {
      message: `${userId} is now following ${userToFollowId}`
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
