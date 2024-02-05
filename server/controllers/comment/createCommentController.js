import { validateComment } from "../../validations/commentValidator.js";
import { createComment } from "../../services/Comment/createCommentService.js";

export const createCommentController = async (req,res) => {
  const {postId, commentText, postedBy} = req.body;
  try {
    validateComment(postId,commentText, postedBy);
    const result = await createComment(postId,commentText,postedBy);
    return res.status(201).json(result);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}