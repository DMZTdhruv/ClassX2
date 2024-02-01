
export default class PostRepositoryInterface {
  async savePost() {
    throw new Error("Save post method not implemented");
  }
  async getUserProfile(){
    throw new Error("get UserProfile method not implemented")
  }
  async pushPostInUserProfile(userID, postId) {
    throw new Error("Not pushing in the userprofile model?method not implemented")
  }
  async getAllPost() {
    throw new Error("Method is not implemented")
  }
}