import UserProfileRepository from '../../repositories/UserProfileRepository.js'

export default async function checkIfUserFollowsService(
  userId,
  userToFollowId
) {
  try {
    const userRepo = new UserProfileRepository()
    checkUsers(userId, userToFollowId)

    const result = await userRepo.checkIfUserIsAlreadyFollowing(
      userId,
      userToFollowId
    )

    return {
      data: result,
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}

const checkUsers = (userId, userToFollowId) => {
  const userRepo = new UserProfileRepository()

  try {
    const currentUserExists = userRepo.findById(userId)
    if (!currentUserExists) {
      throw new Error(`User with id: ${userId} doesn't exists`)
    }

    const userToFollowExists = userRepo.findById(userToFollowId)
    if (!userToFollowExists) {
      throw new Error(`Failed to find user with the id: ${userToFollowId}`)
    }
  } catch (err) {
    console.log(err.message)
  }
}
