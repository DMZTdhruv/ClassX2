// validations/userProfileValidation.js

export const validateUserProfileInput = (
  userID,
  name,
  username,
  about,
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
  password,
  res
) => {
  if (
    !userID ||
    !name ||
    !username ||
    !about ||
    !userProfileImage ||
    !enrollmentNumber ||
    !branchName ||
    !semesterNumber ||
    !divisionName
  ) {
    return res.status(400).json({ error: 'Missing required fields' })
  }

  return true
}

export const userProfileIdValidator = userId => {
  if (!userId) {
    throw new Error('User profile ID is not present')
  }
}
