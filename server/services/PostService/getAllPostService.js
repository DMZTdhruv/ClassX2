import Post from '../../models/post/post.model.js'
import PostSchema from '../../models/post/postSchema.model..js'

export const getAllPostService = async (startIndex, itemsPerPage) => {
  try {
    const response = await PostSchema.find()
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(itemsPerPage)
      .populate({
        path: 'postedBy',
        model: 'UserProfile',
        select: 'username userProfileImage',
      })
      .populate({
        path: 'comments',
        model: 'Comment',
        populate: [
          {
            path: 'postedBy',
            model: 'UserProfile',
            select: 'username',
          },
        ],
        select: 'commentText',
      })
    return {
      data: response,
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
