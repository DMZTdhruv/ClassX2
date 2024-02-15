export function validateFollow(userId, userToFollowId) {
  try {
    if(!userId || !userToFollowId) {
      throw new Error("Invalid details")
    }
  } catch (err) {
    throw new Error(err.message)
  }
}

export function validateUnFollow(userId, userToUnfollowId) {
  try {
    if(!userId || !userToUnfollowId) {
      throw new Error("Invalid details")
    }
  } catch (err) {
    throw new Error(err.message)
  }
}