import Post from '../../models/post/post.model.js'

export const getAllPostService = async (startIndex, itemsPerPage, userProfileId) => {
  try {
    const response = await Post.find()
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
