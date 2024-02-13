import PostRepositoryInterface from '../interfaces/PostRepositoryInterface.js'
import UserProfile from '../models/user/userProfile.model.js'
import Post from '../models/post/post.model.js'

export default class PostRepository extends PostRepositoryInterface {
  async savePost(post) {
    return post.save()
  }

  async getUserProfile(userID) {
    return UserProfile.findOne({ userID })
  }

  async pushPostInUserProfile(userID, postId) {
    const userProfile = await UserProfile.findOne({_id: userID})
     userProfile.posts.push(postId)
    return userProfile.save()
  }
  
  async findPostById(postId){
    return await Post.findById(postId);
  }
}
