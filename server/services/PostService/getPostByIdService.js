import PostRepository from "../../repositories/PostRepository.js"

export default async function getPostByIdService(postId) {
  try {
    const postRepo = new PostRepository();
    const post = await postRepo.findPostById(postId);
    if(!post) {
      throw new Error(`The post with ${postId} doesn't exist`)
    }
    
    return {
      data: post
    }
  } catch (err) {
    throw new Error(err.message)
  }
}