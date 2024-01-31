// services/userProfileService.js
import UserProfileRepository from "../repositories/UserProfileRepository.js";
import BranchRepository from "../repositories/BranchRepository.js";
import SemesterRepository from "../repositories/SemesterRepository.js";
import DivisionRepository from "../repositories/DivisionRepository.js";
import { validateUserProfileInput } from "../validations/userProfileValidation.js";
import { createUserProfileInstance } from "./userProfileInstanceService.js";

const userProfileRepository = new UserProfileRepository();

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

    const userProfile = await createUserProfileInstance(
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

    await userProfileRepository.save(userProfile);

    return {
      message: "User Profile created successfully",
      userProfile,
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
