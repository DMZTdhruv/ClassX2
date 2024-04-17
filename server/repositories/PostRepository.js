import PostRepositoryInterface from '../interfaces/PostRepositoryInterface.js'
import UserProfile from '../models/user/userProfile.model.js'
import Post from '../models/post/post.model.js'
import Comment from '../models/comment/comment.model.js'
import ReplyComment from '../models/comment/repliedComment.model.js'

export default class PostRepository extends PostRepositoryInterface {
  async savePost(post) {
    return post.save()
  }

  async getUserProfile(userID) {
    return UserProfile.findOne({ userID })
  }

  async pushPostInUserProfile(userID, postId) {
    const userProfile = await UserProfile.findOne({ _id: userID })
    userProfile.posts.push(postId)
    return userProfile.save()
  }

  async findPostById(postId) {
    return await Post.findById(postId)
      .populate({
        path: 'postedBy',
        model: 'UserProfile',
        select: 'username userProfileImage',
      })
      .populate({
        path: 'comments',
        model: 'Comment',
        options: { sort: { createdAt: -1 } },
        populate: [
          {
            path: 'postedBy',
            model: 'UserProfile',
            select: 'username userProfileImage',
          },
        ],
      })
  }

  async findPostByIdWithPostedBy(postId) {
    return await Post.findById(postId).populate({
      path: 'postedBy',
      model: 'UserProfile',
      select: 'username userProfileImage',
    })
  }

  async deletePostById(post, userProfileId) {
    if (post.comments.length > 0) {
      const comment = post.comments
      for (let i = 0; i < comment.length; i++) {
        const commentId = comment[i]
        await ReplyComment.deleteMany({ parentCommentId: commentId })
        await Comment.deleteOne(commentId)
      }
    }
    const user = await UserProfile.findById(userProfileId)
    await user.posts.remove(post._id)
    await user.savedPosts.remove(post._id)
    await user.save()
    await Post.deleteOne(post._id)
  }
}
