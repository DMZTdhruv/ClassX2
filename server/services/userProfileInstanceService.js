// services/userProfileInstanceService.js
import UserProfile from "../models/user/userProfile.model.js";
import UserProfileRepository from "../repositories/UserProfileRepository.js";
import { userService } from "./userService.js";

const userProfileRepository = new UserProfileRepository();

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
