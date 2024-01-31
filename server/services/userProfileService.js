// services/userProfileService.js
import UserProfileRepository from "../repositories/UserProfileRepository.js";
import BranchRepository from "../repositories/BranchRepository.js";
import SemesterRepository from "../repositories/SemesterRepository.js";
import DivisionRepository from "../repositories/DivisionRepository.js";
import { validateUserProfileInput } from "../validations/userProfileValidation.js";
import { userService } from "./userService.js";
import UserProfile from "../models/user/userProfile.model.js";
import UserRepository from "../repositories/UserRepository.js";

const userProfileRepository = new UserProfileRepository();
const userRepository = new UserRepository();

export async function createUserProfileInstance(
  userID,
  name,
  enrollmentNumber,
  branches,
  isPrivate,
  friends,
  posts,
  groups,
  email,
  password
) {
  const existingUserProfile = await userProfileRepository.findByUserID(userID);

  if (existingUserProfile) {
    throw new Error("User Profile already exists");
  }

  const existingUserProfileByEmail = await userProfileRepository.findByEmail(
    email
  );

  if (existingUserProfileByEmail) {
    throw new Error("User Profile with the same email already exists");
  }

  await userService.checkPasswordMatch(userID, password);

  return new UserProfile({
    userID,
    name,
    enrollmentNumber,
    branches,
    isPrivate,
    friends,
    posts,
    groups,
    email,
    password,
  });
}

export const createUserProfile = async (
  userID,
  name,
  enrollmentNumber,
  branchName,
  semesterNumber,
  divisionName,
  isPrivate,
  friends,
  posts,
  groups,
  email,
  password
) => {
  try {
    validateUserProfileInput(
      userID,
      name,
      enrollmentNumber,
      branchName,
      semesterNumber,
      divisionName,
      isPrivate,
      friends,
      posts,
      groups,
      email,
      password
    );

    const branchRepository = new BranchRepository();
    const semesterRepository = new SemesterRepository();
    const divisionRepository = new DivisionRepository();

    const branch = await branchRepository.findBranchByName(branchName);
    const semester = await semesterRepository.findSemesterByNumberAndBranch(
      semesterNumber,
      branch
    );
    const division = await divisionRepository.findOrCreateDivision(
      divisionName,
      semester
    );

    const userProfileInstance = await createUserProfileInstance(
      userID,
      name,
      enrollmentNumber,
      [branch._id],
      isPrivate,
      friends,
      posts,
      groups,
      email,
      password
    );

    // get user
    const user = await userRepository.findByID(userID);

    // adding ref of userProfile
    user.userProfile = userProfileInstance._id;

    // saving user data and user profile
    await userRepository.save(user);
    await userProfileRepository.save(userProfileInstance);

    return {
      message: "User Profile created successfully",
      userProfile: userProfileInstance,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
