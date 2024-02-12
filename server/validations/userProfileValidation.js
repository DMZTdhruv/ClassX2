// validations/userProfileValidation.js

export const validateUserProfileInput = (
  user,
  userID,
  name,
  username,
  userProfileImage,
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
  if (
    !user.userID || 
    !name ||
    !username ||
    !userProfileImage ||
    !enrollmentNumber ||
    !branchName ||
    !semesterNumber ||
    !divisionName
  ) {
    throw new Error("Missing required input fields");
  }

  return true;
};

export const userProfileIdValidator = (userId) => {
  if(!userId) {
    throw new Error("User profile ID is not present")
  }
}
