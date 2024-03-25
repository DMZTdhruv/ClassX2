export const editProfileValidator = (username, name, bio, privateAccount, gender) => {
  if (!username || !name || !bio || !privateAccount) {
    return true
  }
  return false
}
