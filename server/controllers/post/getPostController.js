import { getAllPostService } from '../../services/PostService/getAllPostService.js'
import getPostByIdService from '../../services/PostService/getPostByIdService.js'

export const getPostController = async (req, res) => {
  const { page, limit } = req.query
  const currentPage = parseInt(page) || 1
  const itemsPerPage = parseInt(limit) || 10
  const startIndex = (currentPage - 1) * itemsPerPage
  try {
    const results = await getAllPostService(startIndex, itemsPerPage)
    res.json(results)
  } catch (err) {
    res.status(500).json(err.message)
  }
}

export const getPostByIdController = async (req, res) => {
  const { postId } = req.query
  try {
    const results = await getPostByIdService(postId);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json(err.message)
  }
}