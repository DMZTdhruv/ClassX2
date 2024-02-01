import { getAllPostService } from "../../services/PostService/getAllPostService.js";

export const getPostController = async (req,res) => {
  try {
    const paginatedResults = res.paginatedResults;
    const results = await getAllPostService(paginatedResults)
    res.json(results);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
