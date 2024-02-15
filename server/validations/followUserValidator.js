export default function validateFollow(userId, userToFollowId) {
  try {
    if(!userId || !userToFollowId) {
      throw new Error("Invalid details")
    }
  } catch (err) {
    throw new Error(err.message)
  }
}