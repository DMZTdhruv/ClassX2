import getUserProfileByDivisionService from '../../services/ProfileService/getUserProfileByDivisionService.js'
import { userProfileIdValidator } from '../../validations/ProfileValidators/userProfileValidation.js'

export default async function getUserProfilesByDivisionNameController(
  req,
  res
) {
  const {userProfileId} = req.user;
  try {
    userProfileIdValidator(userProfileId)
    const result = await getUserProfileByDivisionService(userProfileId)
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
