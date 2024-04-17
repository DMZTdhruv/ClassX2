import { validateUserUnlikedPost } from '../../validations/PostValidators/postValidators.js'
import PostRepository from '../../repositories/PostRepository.js'
import { returnMessage } from '../../utils/returnMessage.js'

export default async function unlikePostService(userProfileID, postId) {
  try {
    validateUserUnlikedPost(userProfileID, postId)

    const postRepo = new PostRepository()
    const postExists = await postRepo.findPostById(postId)

    if (!postExists) {
      return returnMessage(401, { error: 'Post not found' })
    }

    // removing user like
    postExists.likes.remove(userProfileID)
    await postExists.save()
    return returnMessage(200, { message: 'Post Unliked. ' + postId, data: postExists })
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
