// validations/userProfileValidation.js

export const validateUserProfileInput = (
  user,
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
  if (
    !user.userID || 
    !name ||
    !enrollmentNumber ||
    !branchName ||
    !semesterNumber ||
    !divisionName
  ) {
    throw new Error("Missing required input fields");
  }

  return true;
};