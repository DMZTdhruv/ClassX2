import getUserPostsService from "../../services/PostService/getUserPostsService.js";

export default async function getUserPostsController(req,res) {
  try {
    const {userProfileId} = req.user;
    const result = await getUserPostsService(userProfileId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err.message);
  }
}
