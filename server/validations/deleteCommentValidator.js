export const delete_parent_comment_validator = (comment) => {
  if(!comment) {
    throw new Error(`Incomplete details for deleting comment`)
  }
}

export const delete_sub_comment_validator = (comment) => {
  if(!comment) {
    throw new Error(`Incomplete details for deleting sub comment`);
  }
}