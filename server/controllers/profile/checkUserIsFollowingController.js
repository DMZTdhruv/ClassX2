import checkIfUserFollowsService from "../../services/ProfileService/checkIfUserFollowsService.js";

export default async function checkIfUserIsFollowingController(req,res){
  const {userId, userToFollowId} = req.query;
  console.log(userId, userToFollowId);
  try {
    const result = await checkIfUserFollowsService(userId,userToFollowId);
    res.status(200).json(result);
  } catch (err){ 
    res.status(500).json({message: err.message})
  } 
}