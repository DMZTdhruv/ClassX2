import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import { returnMessage } from '../../utils/returnMessage.js'
import { editProfileValidator } from '../../validations/ProfileValidators/editProfileValidator.js'

export const editProfileService = async (
  userProfileId,
  username,
  name,
  userProfileImage,
  bio,
  privateAccount,
  gender
) => {
  try {
    const validateUserEditDetails = editProfileValidator(
      username,
      name,
      bio,
      privateAccount,
      gender
    )
    if (validateUserEditDetails) {
      return returnMessage(401, { error: 'Unauthorized.' })
    }

    const userProfileRepo = new UserProfileRepository()

    await userProfileRepo.editProfile(
      userProfileId,
      username,
      name,
      userProfileImage,
      bio,
      privateAccount,
      gender
    )

    return returnMessage(201, { message: `Updated profile successfully.` })
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}
