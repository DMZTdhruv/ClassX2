import { getUserProfileService } from "../../services/ProfileService/getUserProfileService.js";

export const getUserProfileController = async (req,res) => {
  const user = req.user;
  try {
    await getUserProfileService(user,res);
  } catch (err) {
    res.status(401).json({message: "User profile not found"})
  }
}