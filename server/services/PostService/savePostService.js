import PostRepository from '../../repositories/PostRepository.js'
import { returnMessage } from '../../utils/returnMessage.js'
import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import Post from '../../models/post/post.model.js'

const postRepository = new PostRepository()
const userRepo = new UserProfileRepository()

export const savePostService = async (postId, userProfileId) => {
  try {
    const post = await postRepository.findPostById(postId)
    if (!post) {
      return returnMessage(401, { error: 'Post not found' })
    }

    const savePost = await userRepo.savePost(postId, userProfileId, post)
    if (!savePost) {
      return returnMessage(401, { error: 'Error in saving post' })
    }

    return returnMessage(200, { message: 'Post saved successfully' })
  } catch (error) {
    console.log(`Error in savePostService: ${error.message}`)
    throw new Error(error.message)
  }
}

//delete post from the saved as well when the user deletes it
export const unSavePostService = async (postId, userProfileId) => {
  try {
    const post = await postRepository.findPostById(postId)
    await userRepo.unSavePost(postId, userProfileId, post)
    return returnMessage(200, { message: 'removed post from saves successfully' })
  } catch (error) {
    console.log(`Error in savePostService: ${error.message}`)
    throw new Error(error.message)
  }
}

export const getAllSavedPostService = async (
  startIndex,
  itemsPerPage,
  userProfileId
) => {
  try {
    const response = await Post.find({ saved: userProfileId })
      .skip(startIndex)
      .limit(itemsPerPage)
      .select('imageUrl')

    return returnMessage(200, { data: response })
  } catch (error) {
    console.log(`Error in savePostService: ${error.message}`)
    throw new Error(error.message)
  }
}
export const getTotalPostSavedService = async userProfileId => {
  try {
    const totalDocuments = await Post.find({ saved: userProfileId }).countDocuments({})
    return {
      statusCode: 200,
      response: {
        message: `Received total document length successfully`,
        data: totalDocuments,
      },
    }
  } catch (error) {
    console.log(`Error in getTotalPostService: ${error.message}`)
    throw new Error(error.message)
  }
}
