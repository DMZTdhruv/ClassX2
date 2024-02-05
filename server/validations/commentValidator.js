// validate create post user input

export const validateComment = (
  postId,
  commentText,
  postedBy,
) => {
  if (!postId || !commentText  || !postedBy) {
    throw new Error('Incomplete post details')
  }
  return true;
}

export const validateCommentLike = (commentId, userID) => {
  if(!userID || !commentId) {
    throw new Error('Incomplete post details')
  }
  return true;
}

export const repliedCommentValidator = (
  postId,
  repliedUser,
  commentText,
  postedBy
) => {
  if(!postId || !repliedUser || !commentText || !postedBy) {
    throw new Error("Incomplete details")
  }

  return true
}