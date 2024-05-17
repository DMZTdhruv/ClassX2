import getSuggestedUserService from '../../services/UserService/getSuggestedUserService.js';

export default async function getSuggestedUser(req, res) {
  try {
    const { userProfileId } = req.user;
    const { statusCode, response } = await getSuggestedUserService(userProfileId);
    return res.status(statusCode).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(200).json({ error: `Internal server error` });
  }
}
