import CommentRepository from '../../repositories/CommentRepository.js'
import PostRepository from '../../repositories/PostRepository.js'

export const createComment = async (postId, commentText, postedBy) => {
  try {
    const commentRepository = new CommentRepository()
    const postRepository = new PostRepository()

    const post = postRepository.findPostById(postId)

    if (!post) {
      throw new Error('post does not exist')
    }

    const newComment = await commentRepository.createNewComment(
      postId,
      commentText,
      postedBy
    )
    await commentRepository.pushComment(postId, newComment._id)
    console.log(newComment)
    return {
      message: newComment,
    }
  } catch (err) {
    return {
      message: err.message,
    }
  }
}
