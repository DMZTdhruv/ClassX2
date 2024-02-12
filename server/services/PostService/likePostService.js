import UserProfileRepository from "../../repositories/UserProfileRepository.js";
import { validateUserLikePost } from "../../validations/postValidators.js";
import PostRepository from "../../repositories/PostRepository.js";

export default async function likePostService(userProfileID, postId) {
  try {
    validateUserLikePost(userProfileID, postId);
    
    // checking if the user exists or not
    const userProfileRepo = new UserProfileRepository();
    const userExists = await userProfileRepo.findById(userProfileID);
    if(!userExists) {
      throw new Error('User does not exits')
    }

    // later checking the post
    const postRepo = new PostRepository();
    const postExists = await postRepo.findPostById(postId);
    
    if(!postExists) {
      throw new Error("Either the post is deleted by user or doesn't exist")
    }

    postExists.likes.push(userProfileID);
    const editedPost = await postExists.save();    
    return {
      message: "Post liked.",
      post: editedPost
    }

  } catch (err) {
    console.log(err);
    throw new Error(err.message)
  }
}