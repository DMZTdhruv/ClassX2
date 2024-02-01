import PostRepository from '../repositories/PostRepository.js'
import { validateCreatePostInput } from '../validations/createPostValidator.js'
import Post from '../models/post/post.model.js'

export const createPostInstance = async (
  title,
  imageUrl,
  caption,
  location,
  category,
  postedBy
) => {
  return new Post({
    title,
    imageUrl,
    caption,
    location,
    category,
    postedBy
  })
}

export const createPostService = async (
  user,
  title,
  imageUrl,
  caption,
  location,
  category,
  postedBy
) => {
  const userProfileId = postedBy;
  
  try {
    validateCreatePostInput(
      title,
      imageUrl,
      caption,
      location,
      category,
      postedBy,
    )

    const postRepository = new PostRepository()
    const postInstance = await createPostInstance(
      title,
      imageUrl,
      caption,
      location,
      category,
      postedBy
    )
    const userProfile = await postRepository.getUserProfile(userProfileId);
    const savedPost = await postRepository.savePost(postInstance);
    //pushing postId in userProfile  
    await postRepository.pushPostInUserProfile(userProfileId, savedPost._id)
  
    return {
      message: "Posted.",
      post: savedPost
    }
  } catch (err) {
    throw new Error(err.message)
  }
}
