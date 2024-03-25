export const deletePostValidator = (postId, userProfileId) => {
  if (!postId || !userProfileId) {
    throw new Error('Incomplete details')
  }
}
