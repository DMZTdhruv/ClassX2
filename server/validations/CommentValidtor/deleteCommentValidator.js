export const delete_parent_comment_validator = (comment, userProfileId) => {
  if (!comment || !userProfileId) {
    throw new Error(`Incomplete details for deleting comment`)
  }
}

export const delete_sub_comment_validator = (comment, userProfileId) => {
  if (!comment || !userProfileId) {
    throw new Error(`Incomplete details for deleting sub comment`)
  }
}
