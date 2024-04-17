import { validateUserLikePost } from '../../validations/PostValidators/postValidators.js'
import PostRepository from '../../repositories/PostRepository.js'
import { returnMessage } from '../../utils/returnMessage.js'

export default async function likePostService(userProfileID, postId) {
  try {
    validateUserLikePost(userProfileID, postId)

    // finding post
    const postRepo = new PostRepository()
    const postExists = await postRepo.findPostById(postId)

    if (!postExists) {
      return returnMessage(401, { error: 'Post not found' })
    }

    //check if like already exists or not
    const likeExists = postExists.likes.includes(userProfileID)
    if (!!likeExists) {
      return returnMessage(401, { error: 'User has already liked the post' })
    }

    postExists.likes.push(userProfileID)
    await postExists.save()
    return returnMessage(200, { message: 'Post liked. ' + postId, data: postExists })
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
