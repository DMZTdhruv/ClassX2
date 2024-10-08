// interfaces/UserProfileRepositoryInterface.js
export default class UserProfileRepositoryInterface {
  async findByUserID(userID) {
    throw new Error('Method not implemented');
  }

  async getUserData(userID) {
    throw new Error('Method not implemented');
  }

  async findById(_id) {
    throw new Error('Method not implemented');
  }

  async findByEmail(email) {
    throw new Error('Method not implemented');
  }

  async save(userProfile) {
    throw new Error('Method not implemented');
  }

  async findByUsername(username) {
    throw new Error('Method not implemented');
  }

  async findByUsernameFilter(username) {
    throw new Error('Method not implemented');
  }

  async findUserByDivisionId(divisionId) {
    throw new Error('Method not implemented');
  }

  async getUserPosts(userId) {
    throw new Error('Method not implemented');
  }

  async followUser(userId, userToFollowId) {
    throw new Error('Method not implemented');
  }

  async editProfile() {
    throw new Error(`Method not implemented Edit profile`);
  }

  async savePost() {
    throw new Error(`Save post method not implemented`);
  }
  async unSavePost() {
    throw new Error(`Unsave post method not implemented`);
  }

  async getAllSavePost() {
    throw new Error(`Get all save post method not implemented`);
  }
  async getFollowers(userProfileId) {
    throw new Error(`Method not implemented`);
  }

  async getSuggestedUser(userProfileId) {
    throw new Error(`Method not implemented`);
  }
}
