import {
  getAllSavedPostService,
  getTotalPostSavedService,
  savePostService,
  unSavePostService,
} from '../../services/PostService/savePostService.js'

export const savePostController = async (req, res) => {
  try {
    const { postId } = req.params
    const { userProfileId } = req.user
    const { statusCode, response } = await savePostService(postId, userProfileId)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in savePostController: ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const unSavePostController = async (req, res) => {
  try {
    const { postId } = req.params
    const { userProfileId } = req.user
    const { statusCode, response } = await unSavePostService(postId, userProfileId)
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in savePostController: ${error.message}`)
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getAllSavedPost = async (req, res) => {
  try {
    const { page, limit } = req.query
    const { userProfileId } = req.user
    const currentPage = parseInt(page) || 1
    const itemsPerPage = parseInt(limit) || 10
    const startIndex = (currentPage - 1) * itemsPerPage
    const { statusCode, response } = await getAllSavedPostService(
      startIndex,
      itemsPerPage,
      userProfileId
    )
    res.status(statusCode).json(response)
  } catch (error) {
    res.status(500).json({ error: `Internal server error` })
  }
}

export const getTotalSavedPostCount = async (req, res) => {
  try {
    const {userProfileId} = req.user;
    const { statusCode, response } = await getTotalPostSavedService(userProfileId);
    res.status(statusCode).json(response)
  } catch (error) {
    console.log(`Error in getTotalSavedPostCount controller`)
    res.status(500).json({ error: `Internal server error` })
  }
}
