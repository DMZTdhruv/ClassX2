import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import {validateUnFollow} from '../../validations/FollowUserValidator.js'

export default async function unFollowUserService(userId, userToFollowId) {
  try {
    validateUnFollow(userId, userToFollowId)
    
    const userRepo = new UserProfileRepository()

    //checking users
    checkUsers(userId, userToFollowId)

    // checking if the current user is already following
    const isAlreadyFollowingEachOther = await userRepo.checkUserUnFollowStatus(userId,userToFollowId);


    if(!isAlreadyFollowingEachOther){
      throw new Error("Cannot unfollow a user which is not followed by user: " + userId)
    }

    const result = await userRepo.unfollowUser(userId, userToFollowId)

    return {
      message: `${userId} is now unfollowing ${userToFollowId}`
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
