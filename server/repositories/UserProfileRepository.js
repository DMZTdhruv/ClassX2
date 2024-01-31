// repositories/UserProfileRepository.js
import UserProfileRepositoryInterface from "../interfaces/UserProfileRepositoryInterface.js";
import UserProfile from "../models/user/userProfile.model.js";

export default class UserProfileRepository extends UserProfileRepositoryInterface {
  async findByUserID(userID) {
    return UserProfile.findOne({ userID });
  }

  async findByEmail(email) {
    return UserProfile.findOne({ email });
  }

  async save(userProfile) {
    return userProfile.save();
  }

  async findSemester(semesterNumber) {
    
  }
}
