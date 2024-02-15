import followUserService from "../../services/ProfileService/followUserService.js";

export default async function followUserController(req,res)  {
  const {userProfileId} = req.user;
  const {userToFollowId} = req.body;

  try {
    const result = await followUserService(userProfileId, userToFollowId)
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}