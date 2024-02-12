export function validateUserLikePost(userProfileID, postId){
  if(!userProfileID || !postId) {
    throw new Error("Incomplete details")
  }
}

export function validateUserUnlikedPost(userProfileID, postId){
  if(!userProfileID || !postId) {
    throw new Error("Incomplete details")
  }
}

