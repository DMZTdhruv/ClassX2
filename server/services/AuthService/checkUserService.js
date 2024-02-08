import UserRepository from "../../repositories/UserRepository.js";
import UserProfileRepository from "../../repositories/UserProfileRepository.js";

export const checkUserService = async (userID) => {
  if (!userID) {
    return {
      user: false,
      userProfile: false
    }
  }

  try {
    const userRepo = new UserRepository();
    const user = await userRepo.findUserById(userID);
    console.log(user);
    // Check userProfile:
    const userProfileRepo = new UserProfileRepository();
    const userProfile = await userProfileRepo.getUserData(userID);

    if (!user) {
      return {
        user: false,
        userProfile: false
      }
    }

    if (!userProfile) {
      return {
        user: true,
        userProfile: false,
      };
    }

    return {
      user: true,
      userProfile: true,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
