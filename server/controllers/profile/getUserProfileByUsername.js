import getUserProfileByUsernameService from "../../services/ProfileService/getUserProfile.js";

export default async function GetUserProfile(req, res) {
  const {username} = req.query;
  try {
    const result = await getUserProfileByUsernameService(username);
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}