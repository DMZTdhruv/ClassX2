// services/userProfileService.js
import UserProfileRepository from '../../repositories/UserProfileRepository.js'
import BranchRepository from '../../repositories/BranchRepository.js'
import SemesterRepository from '../../repositories/SemesterRepository.js'
import DivisionRepository from '../../repositories/DivisionRepository.js'
import { validateUserProfileInput } from '../../validations/userProfileValidation.js'
import UserProfile from '../../models/user/userProfile.model.js'
import UserRepository from '../../repositories/UserRepository.js'
import jwt from 'jsonwebtoken'

const userProfileRepository = new UserProfileRepository()
const userRepository = new UserRepository()

export async function createUserProfileInstance(
  userID,
  name,
  username,
  userProfileImage,
  enrollmentNumber,
  branches,
  isPrivate,
  semesterNumber,
  division,
  friends,
  posts,
  groups
) {
  const existingUserProfile = await userProfileRepository.findByUserID(userID)
  const existingUsername = await userProfileRepository.findByUsername(username)

  if (existingUsername) {
    throw new Error('This username already exists')
  }

  if (existingUserProfile) {
    throw new Error('User Profile already exists')
  }

  const user = await userRepository.findByID(userID)
  const userEmail = user.email
  const existingUserProfileByEmail = await userProfileRepository.findByEmail(
    userEmail
  )

  if (existingUserProfileByEmail) {
    throw new Error('User Profile with the same email already exists')
  }

  return new UserProfile({
    userID,
    name,
    username,
    userProfileImage,
    enrollmentNumber,
    branches,
    isPrivate,
    semesterNumber,
    division,
    friends,
    posts,
    groups,
  })
}

export const createUserProfile = async (
  currentUser,
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
  try {
    validateUserProfileInput(
      currentUser,
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
    )

    const branchRepository = new BranchRepository()
    const semesterRepository = new SemesterRepository()
    const divisionRepository = new DivisionRepository()

    const branch = await branchRepository.findBranchByName(branchName)
    const semester = await semesterRepository.findSemesterByNumberAndBranch(
      semesterNumber,
      branch
    )

    const division = await divisionRepository.findOrCreateDivision(
      divisionName,
      semester
    )

    const userProfileInstance = await createUserProfileInstance(
      currentUser.userID,
      name,
      username,
      userProfileImage,
      enrollmentNumber,
      [branch._id],
      isPrivate,
      [semester._id],
      [division._id],
      friends,
      posts,
      groups
    )

    // get user
    const user = await userRepository.findByID(currentUser.userID)
    // adding ref of userProfile
    user.userProfile = userProfileInstance._id

    // saving user data and user profile
    await userRepository.save(user)

    //saving user profile
    await userProfileRepository.save(userProfileInstance)
    
    const token = jwt.sign(
      {
        userID: user._id,
        userProfileId: userProfileInstance._id,
        username: userProfileInstance.username,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '30d',
      }
    )

    return {
      message: 'User Profile created successfully',
      userProfile: userProfileInstance,
      token: token,
    }
  } catch (error) {
    console.log(error)
    throw new Error(error.message)
  }
}
