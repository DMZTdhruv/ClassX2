import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import { validateUserUnlikedPost } from '../../validations/postValidators.js'
import PostRepository from '../../repositories/PostRepository.js'

export default async function unlikePostService(userProfileID, postId) {
  try {
    validateUserUnlikedPost(userProfileID, postId)
    const userProfileRepo = new UserProfileRepository()
    const userExists = await userProfileRepo.findById(userProfileID)
    console.log(userExists)
    
    // if user doesn't exist throw error
    if (!userExists) {
      throw new Error('User does not exits')
    }
  
    const postRepo = new PostRepository()
    const postExists = await postRepo.findPostById(postId)
    console.log(postExists)
  
    if (!postExists) {
      throw new Error("Either the post is deleted by user or doesn't exist")
    }

    // removing user like
    postExists.likes.remove(userProfileID)

    const editedPost = await postExists.save({select: '_id likes'})
    return {
      message: 'Post Unliked',
      post: editedPost,
    }
  } catch (err) {
    console.log(err)
    throw new Error(err.message)
  }
}
