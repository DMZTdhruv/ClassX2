import { validateUserUnlikedPost } from '../../validations/postValidators.js'
import PostRepository from '../../repositories/PostRepository.js'

export default async function unlikePostService(userProfileID, postId) {
  try {
    validateUserUnlikedPost(userProfileID, postId)

    const postRepo = new PostRepository()
    const postExists = await postRepo.findPostById(postId)

    if (!postExists) {
      throw new Error(
        'Either the post ' + postId + " is deleted by user or doesn't exist"
      )
    }

    // removing user like
    postExists.likes.remove(userProfileID)
    const unlikedPost = await postExists.save({ select: '_id likes' })
    return {
      message: 'Post Unliked',
      post: unlikedPost,
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
