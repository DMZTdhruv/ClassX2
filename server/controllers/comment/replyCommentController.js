import { repliedCommentValidator } from "../../validations/commentValidator.js";

export const replyCommentController = async (req, res) => {
  try {
    const { postId, repliedUser, commentText, postedBy } = req.body
    repliedCommentValidator(postId, repliedUser, commentText, postedBy);
  } catch (err) {}
}
