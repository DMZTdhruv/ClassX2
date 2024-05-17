export default class PostRepositoryInterface {
  async savePost() {
    throw new Error('Save post method not implemented');
  }
  async getUserProfile() {
    throw new Error('get UserProfile method not implemented');
  }
  async pushPostInUserProfile(userID, postId) {
    throw new Error('Not pushing in the userprofile model?method not implemented');
  }
  async getAllPost() {
    throw new Error('getAllPost Method is not implemented');
  }
  async savePost() {
    throw new Error('savePost Method is not implemented');
  }

  async unSavePost() {
    throw new Error(`Unsave post method not implemented`);
  }
  async getSavePost() {
    throw new Error(`getSavePost Method is not implemented`);
  }

  async sendPost() {
    throw new Error(`sendPost method not implemented.`);
  }
}
