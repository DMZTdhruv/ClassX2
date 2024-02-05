import Post from '../models/post/post.model.js'
import CommentRepositoryInterface from '../interfaces/CommentRepositoryInterface.js'
import Comment from '../models/comment/comment.model.js'

export default class CommentRepository extends CommentRepositoryInterface {
  async createNewComment(postId, commentText, userId) {
    const newComment = new Comment({
      postId: postId,
      commentText: commentText,
      postedBy: userId,
    })
    return await newComment.save()
  }
  async pushComment(postId, commentId) {
    const post = await Post.findOne({ _id: postId })
    post.comments.push(commentId)
    return await post.save()
  }
}
