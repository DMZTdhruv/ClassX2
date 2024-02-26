import Post from '../models/post/post.model.js'
import CommentRepositoryInterface from '../interfaces/CommentRepositoryInterface.js'
import Comment from '../models/comment/comment.model.js'
import ReplyComment from '../models/comment/repliedComment.model.js'

export default class CommentRepository extends CommentRepositoryInterface {
  async createNewComment(postId, commentText, userId) {
    const newComment = new Comment({
      postId: postId,
      commentText: commentText,
      postedBy: userId,
    })

    const result = (await newComment.save()).populate({
      path: 'postedBy',
      model: 'UserProfile',
      select: 'username userProfileImage',
    })
    return await result
  }

  async pushComment(postId, commentId) {
    const post = await Post.findOne({ _id: postId })
    post.comments.push(commentId)
    return await post.save()
  }

  async findCommentById(commentId) {
    return await Comment.findOne({ _id: commentId })
  }

  async findSubCommentById(commentId) {
    return await ReplyComment.findOne({ _id: commentId })
  }

  async subCommentsOfParentComment(commentId) {
    return await Comment.findOne({_id: commentId}).populate({
      path: 'commentReplies',
      model: 'ReplyComment',
      populate: [
        {
          path: 'postedBy',
          model: 'UserProfile',
          select: 'username userProfileImage'
        }
      ]
    })
  }

  async deleteComment(_id) {
    await Comment.deleteOne({_id});
  }

}
