import { uploadPostService } from '../../services/PostService/uploadPostService.js'

export const PostController = async (req, res) => {
  try {
    console.log('Hello')
    const { userProfileId } = req.user
    const { attachments, caption, location, category, aspectRatio } = req.body

    console.log(req.body)

    const { statusCode, response } = await uploadPostService(
      userProfileId,
      attachments,
      aspectRatio,
      caption,
      location,
      category
    )

    res.status(statusCode).json(response)
  } catch (error) {
    console.log(error.message)
    res.status(500).json({ error: `Internal server error` })
  }
}
