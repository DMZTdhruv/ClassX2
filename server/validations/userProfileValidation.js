// validations/userProfileValidation.js

export const validateUserProfileInput = (
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
    !userID ||
    !name ||
    !enrollmentNumber ||
    !branchName ||
    !semesterNumber ||
    !divisionName ||
    !email ||
    !password
  ) {
    throw new Error("Missing required input fields");
  }

  // Add more specific validation checks as needed

  return true;
};
