import UserProfile from '../models/user/userProfile.model.js'

export default class AuthRepository {
  async getUserInfo(userProfileId) {
    const user = await UserProfile.findById(userProfileId).select(
      'userProfileImage userID username _id'
    )
    return user
  }
}
