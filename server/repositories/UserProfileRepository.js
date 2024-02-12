// repositories/UserProfileRepository.js
import UserProfileRepositoryInterface from '../interfaces/UserProfileRepositoryInterface.js'
import UserProfile from '../models/user/userProfile.model.js'

export default class UserProfileRepository extends UserProfileRepositoryInterface {
  async findByUserID(userID) {
    return UserProfile.findOne({ userID })
      .populate('semesterNumber', 'semesterNumber')
      .populate('division', 'divisionName')
      .populate('branches', 'branchName')
  }

  async getUserData(userID) {
    return await UserProfile.findOne({ userID }, '_id username')
  }

  async findById(_id) {
    return await UserProfile.findById(_id);
  }

  async findByEmail(email) {
    return UserProfile.findOne({ email })
  }

  async save(userProfile) {
    return userProfile.save()
  }

  async findSemester(semesterNumber) {}
  async findByUsername(username) {
    return await UserProfile.findOne({ username: username })
  }
}
