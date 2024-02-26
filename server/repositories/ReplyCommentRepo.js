import Comment from "../models/comment/comment.model.js";
import ReplyComment from "../models/comment/repliedComment.model.js";
import ReplyCommentRepoInterface from "../interfaces/ReplyCommentRepoInterface.js";

class ReplyCommentRepo extends ReplyCommentRepoInterface{
  async replyComment(postId,repliedUser,commentText, postedBy) {
    const replyComment = new ReplyComment({
      postId: postId,
      repliedUser: repliedUser,
      commentText: commentText,
      postedBy: postedBy
    })
    return await replyComment.save();
  }

  async findCommentById(_id){
    return await ReplyComment.findOne({_id});
  }

  async deleteCommentByParentCommentId(commentId){
    await ReplyComment.deleteMany({parentCommentId: commentId});
  }
}

export default ReplyCommentRepo;