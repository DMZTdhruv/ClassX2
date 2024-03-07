import { validateUserLikePost } from '../../validations/postValidators.js'
import PostRepository from '../../repositories/PostRepository.js'

export default async function likePostService(userProfileID, postId) {
  try {
    validateUserLikePost(userProfileID, postId)

    // finding post
    const postRepo = new PostRepository()
    const postExists = await postRepo.findPostById(postId)

    if (!postExists) {
      throw new Error("Either the post is deleted by user or doesn't exist")
    }

    //check if like already exists or not
    const likeExists = postExists.likes.includes(userProfileID)
    if (!!likeExists) {
      throw new Error('User has already liked the post')
    }

    postExists.likes.push(userProfileID)
    await postExists.save()
    return {
      message: 'Post liked. ' + postId,
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
