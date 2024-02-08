import { checkUserService } from "../../services/AuthService/checkUserService.js";

export const checkUserController = async(req,res) => {
  const {userID} = req.query;
  try {
    const result = await checkUserService(userID);
    res.status(200).json(result);
  } catch (err) {
    res.status(404).json({message: err.message})
  } 
}