export default function deleteUserValidator(userId, userProfileId, password) {
  if (!userProfileId || !password || !userId) {
    throw new Error('Incomplete details')
  }
}
