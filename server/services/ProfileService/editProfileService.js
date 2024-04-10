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
    console.log({
      username,
      name,
      bio,
      privateAccount,
      gender,
      userProfileImage,
    })
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

    const updatedProfile = await userProfileRepo.editProfile(
      userProfileId,
      username,
      name,
      userProfileImage,
      bio,
      privateAccount,
      gender
    )

    return returnMessage(201, {
      message: `Updated profile successfully.`,
      data: {
        userID: updatedProfile.userID,
        userProfileId: updatedProfile._id,
        username: updatedProfile.username,
        userProfileImage: updatedProfile.userProfileImage,
      },
    })
  } catch (error) {
    console.log(error.message)
    throw new Error(error.message)
  }
}
