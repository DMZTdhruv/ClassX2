import CommentRepository from '../../repositories/CommentRepository.js'
import { repliedCommentValidator } from '../../validations/commentValidator.js'
import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import ReplyComment from '../../models/comment/repliedComment.model.js'

export const replyCommentService = async (
  parentCommentId,
  postId,
  repliedUserId,
  commentText,
  postedBy
) => {
  try {
    repliedCommentValidator(
      parentCommentId,
      postId,
      repliedUserId,
      commentText,
      postedBy
    )

    const userProfile = new UserProfileRepository()
    const commentRepo = new CommentRepository()

    //getting the comment
    const parentComment = await commentRepo.findCommentById(parentCommentId)

    // getting the user details
    const user = await userProfile.findById(repliedUserId);
    console.log(user)
    // editing the original comment
    const repliedComment = `${commentText}`

    //creating new reply comment
    const newReply = new ReplyComment({
      parentCommentId,
      postId: parentComment.postId,
      repliedUserId,
      commentText: repliedComment,
      postedBy,
    })

    // saving the new reply
    const saveReply = await newReply.save()

    //pushing the saveReply to the main parent comment
    parentComment.commentReplies.push(saveReply._id)

    await parentComment.save()

    return {
      message: saveReply,
      parentComment: parentComment,
    }
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
