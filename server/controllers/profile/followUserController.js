import followUserService from "../../services/ProfileService/followUserService.js";

export default async function followUserController(req,res)  {
  const {userId, userToFollowId} = req.body;
  try {
    const result = await followUserService(userId, userToFollowId)
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}