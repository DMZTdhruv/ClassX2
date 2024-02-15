import getUserProfileByUsernameService from "../../services/ProfileService/getUserProfileByUsernameService.js";

export default async function GetUserProfileByUsernameController(req, res) {
  const {username} = req.query;
  try {
    const result = await getUserProfileByUsernameService(username);
    res.status(200).json(result)
  } catch (err) {
    res.status(500).json({message: err.message})
  }
}