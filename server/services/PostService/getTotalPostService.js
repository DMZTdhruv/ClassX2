import Post from '../../models/post/post.model.js'

const getTotalPostService = async () => {
  try {
    const totalDocuments = await Post.countDocuments({})
    return {
      statusCode: 200,
      response: {
        message: `Received total document length successfully`,
        data: totalDocuments,
      },
    }
  } catch (error) {
    console.log(`Error in getTotalPostService: ${error.message}`)
    throw new Error(error.message)
  }
}

export default getTotalPostService
