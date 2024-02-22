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
    throw new Error('Incomplete comment details')
  }
  return true;
}

export const validateCommentunLike = (commentId, userID) => {
  if(!userID || !commentId) {
    throw new Error('Incomplete comment details')
  }
  return true;
}

export const repliedCommentValidator = (
  parentCommentId,
  postId,
  repliedUserId,
  commentText,
  postedBy
) => {
  if(!parentCommentId || !postId || !repliedUserId || !commentText || !postedBy) {
    throw new Error("Incomplete details")
  }
  return true
}