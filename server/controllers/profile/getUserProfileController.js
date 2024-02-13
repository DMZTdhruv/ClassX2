import { getUserProfileService } from "../../services/ProfileService/getUserProfileService.js";

export const getUserProfileController = async (req,res) => {
  const user = req.user;
  console.log(user);
  try {
    const result = await getUserProfileService(user);
    res.status(200).json(result);
  } catch (err) {
    res.status(401).json({message: "User profile not found"})
  }
}