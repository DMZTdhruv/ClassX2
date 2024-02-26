import deleteUserValidator from '../../src/validations/deleteUserValidator.js'
import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import UserRepository from '../../repositories/UserRepository.js'
import Post from '../../models/post/post.model.js'
import Comment from '../../models/comment/comment.model.js'
import ReplyComment from '../../models/comment/repliedComment.model.js'

export default async function deleteUserProfileService(
  userId,
  userProfileId,
  password
) {
  try {
    deleteUserValidator(userId, userProfileId, password)
    const userProfileRepo = new UserProfileRepository()
    const userRepo = new UserRepository()

    // find user by id
    const user = await userRepo.findByID(userId)

    // check password
    const passwordMatch = bcrypt.compareSync(password, user.password)
    if (!passwordMatch) {
      throw new Error('Invalid password')
    }

    // is passed get userProifle
    const userProfile = await userRepo.findByID(userProfileId)
    const userCrossCheck = user._id === userProfile.userID
    if (!userCrossCheck) {
      throw new Error('Failed to delete user')
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

const deleteAllUserPosts = async posts => {
  try {
    posts.forEach(post => {})
  } catch (error) {
    throw new Error(error.message)
  }
}
