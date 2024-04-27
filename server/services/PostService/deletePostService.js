import PostRepository from '../../repositories/PostRepository.js'
import { deletePostValidator } from '../../validations/PostValidators/deletePostValidator.js'

export default async function (postId, userProfileId) {
  try {
    deletePostValidator(postId, userProfileId)
    const postRepo = new PostRepository()
    const post = await postRepo.findPostByIdWithPostedBy(postId)

    if (post.postedBy._id.toString() !== userProfileId) {
      throw new Error('Failed to delete the post')
    }
    

    await postRepo.deletePostById(post, userProfileId)
    return {
      message: 'Deleted successfully',
    }
  } catch (error) {
    throw new Error(error.message)
  }
}
