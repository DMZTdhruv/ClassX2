import PostRepository from '../../repositories/PostRepository.js'

export default async function getPostByIdService(postId, res) {
  try {
    const postRepo = new PostRepository()
    const post = await postRepo.findPostById(postId)
    if (!post) {
      return res.status(400).json({ error: `Sorry this post is no longer available` })
    }

    return res.status(200).json({
      data: post,
    })
  } catch (err) {
    console.log(err.message)
    throw new Error(err.message)
  }
}
