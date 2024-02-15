import UserProfile from "../../models/user/userProfile.model.js";
import UserProfileRepository from "../../repositories/UserProfileRepository.js"

export default async function getUserProfileByDivisionService(userProfileId) {
  try {
    
    const userProfileRepo = new UserProfileRepository();
    const {division} = await userProfileRepo.findById(userProfileId)
    console.log(division);
    if(!division) {
      throw new Error("This user has no division")
    }

    const users = await UserProfile.find({division: division}).select('name username userProfileImage division').populate('division')

    return {
      data: users,
    }

  } catch (err) {
    throw new Error(err.message)
  }
}